import { db } from '$lib/server/db';
import { checkUser, randomId } from '$lib/utils';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { notesTable, projectsTable } from '$lib/server/db/schema';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { zAddNote, zEditProject } from '$lib/zod';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = checkUser(locals);

	const editProjectForm = await superValidate(zod(zEditProject));
	const addNoteForm = await superValidate(zod(zAddNote));

	const qProject = await db.query.projectsTable.findFirst({
		where: eq(projectsTable.id, params.id)
	});

	if (qProject === undefined) {
		error(404, { message: 'Project not found' });
	} else if (qProject.userId != user.id) {
		error(403, { message: 'This is not your project' });
	}

	const notes = await db.query.notesTable.findMany({
		where: eq(notesTable.projectId, qProject.id),
		orderBy: desc(notesTable.updatedAt)
	});

	return { project: qProject, editProjectForm, notes, addNoteForm };
};

export const actions: Actions = {
	editProject: async ({ request }) => {
		const form = await superValidate(request, zod(zEditProject));

		if (!form.valid) return fail(400, { form });

		const formData = form.data;

		let date: null | string = null;

		if (formData.date) {
			date = formData.date.toISOString();
		}

		await db.update(projectsTable).set({
			description: formData.description,
			title: formData.title,
			date
		});

		return { form };
	},
	addNote: async ({ request, params }) => {
		const form = await superValidate(request, zod(zAddNote));

		if (!form.valid) return fail(400, { form });

		await db.insert(notesTable).values({
			content: form.data.content,
			projectId: params.id,
			id: randomId(16)
		});
	}
};

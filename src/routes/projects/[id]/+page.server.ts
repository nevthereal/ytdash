import { db } from '$lib/server/db';
import { checkUser, randomId } from '$lib/utils';
import { desc, eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { notesTable, projectsTable } from '$lib/server/db/schema';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { zAddNote, zEditNote, zEditProject } from '$lib/zod';
import dayjs from 'dayjs';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = checkUser(locals);

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

	const editProjectForm = await superValidate(zod(zEditProject), {
		defaults: {
			title: qProject.title,
			date: dayjs(qProject.date).toDate(),
			description: qProject.description
		}
	});
	const addNoteForm = await superValidate(zod(zAddNote));
	const editNoteForm = await superValidate(zod(zEditNote));

	return { project: qProject, editProjectForm, notes, addNoteForm, editNoteForm };
};

export const actions: Actions = {
	editProject: async ({ request, params }) => {
		const form = await superValidate(request, zod(zEditProject));

		if (!form.valid) return fail(400, { form });

		const formData = form.data;

		let date: null | string = null;

		if (formData.date) {
			date = formData.date.toISOString();
		}

		await db
			.update(projectsTable)
			.set({
				description: formData.description,
				title: formData.title,
				date
			})
			.where(eq(projectsTable.id, params.id));

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
	},
	editNote: async ({ request }) => {
		const form = await superValidate(request, zod(zEditNote));

		if (!form.valid) return fail(400, { form });

		await db
			.update(notesTable)
			.set({
				content: form.data.content,
				updatedAt: new Date()
			})
			.where(eq(notesTable.id, form.data.id));
	}
};

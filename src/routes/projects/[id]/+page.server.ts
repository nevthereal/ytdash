import { db } from '$lib/server/db';
import { checkUser } from '$lib/utils';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { projectsTable } from '$lib/server/db/schema';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { zEditProject } from '$lib/zod';

export const load: PageServerLoad = async ({ locals, params }) => {
	const user = checkUser(locals);

	const form = await superValidate(zod(zEditProject));

	const qProject = await db.query.projectsTable.findFirst({
		where: eq(projectsTable.id, params.id)
	});

	if (qProject === undefined) {
		error(404, { message: 'Project not found' });
	} else if (qProject.userId != user.id) {
		error(403, { message: 'This is not your project' });
	}

	return { project: qProject, form };
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
	}
};

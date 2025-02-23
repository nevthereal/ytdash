import { db } from '$lib/db';
import { project } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { zNewProject } from '$lib/zod';

export const load: PageServerLoad = async () => {
	const projects = await db.query.project.findMany();

	const newProjectForm = await superValidate(zod(zNewProject));

	return { projects, newProjectForm };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const form = await superValidate(request, zod(zNewProject));

		if (!form.valid) return fail(400);

		await db.insert(project).values({
			title: form.data.title
		});
	}
};

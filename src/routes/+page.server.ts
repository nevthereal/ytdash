import { db } from '$lib/server/db';
import { projectsTable } from '$lib/server/db/schema';
import { checkUser, randomId } from '$lib/utils';
import { zAddProject } from '$lib/zod';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals }) => {
	checkUser(locals);

	const addForm = await superValidate(zod(zAddProject));

	return { addForm };
};

export const actions: Actions = {
	add: async ({ locals, request }) => {
		const user = checkUser(locals);

		const form = await superValidate(request, zod(zAddProject));

		console.log(form.valid, form.data);

		if (!form.valid) return fail(400, { form });

		const createdProject = await db
			.insert(projectsTable)
			.values({
				id: randomId(6),
				title: form.data.title,
				userId: user.id,
				date: form.data.date
			})
			.returning();

		return redirect(302, `/projects/${createdProject[0].id}`);
	}
};

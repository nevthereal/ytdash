import { db } from '$lib/db';
import { project } from '$lib/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async () => {
	const projects = await db.query.project.findMany();

	return { projects };
};

export const actions: Actions = {
	new: async ({ request }) => {
		const schema = z.object({
			projectName: z.string()
		});

		const formData = schema.parse({ projectName: (await request.formData()).get('project-name') });

		if (!formData) return fail(400);

		await db.insert(project).values({
			title: formData.projectName
		});
	}
};

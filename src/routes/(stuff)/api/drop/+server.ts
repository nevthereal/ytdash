import { db } from '$lib/db';
import { project, projectStatusEnum } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
	const projectId = Number(url.searchParams.get('id'));

	if (Number.isNaN(projectId)) return error(400, 'Number not provided');

	const target = url.searchParams.get('target') as (typeof projectStatusEnum)[number];

	await db
		.update(project)
		.set({
			status: target
		})
		.where(eq(project.id, projectId));

	return new Response();
};

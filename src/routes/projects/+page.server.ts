import { db } from '$lib/server/db';
import { checkUser } from '$lib/utils';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { projectsTable } from '$lib/server/db/schema';

export const load: PageServerLoad = async ({ locals }) => {
	const user = checkUser(locals);

	const projects = db.query.projectsTable.findMany({
		where: eq(projectsTable.userId, user.id),
		orderBy: desc(projectsTable.createdAt)
	});

	return { projects };
};

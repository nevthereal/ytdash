import { db } from '$lib/server/db';
import { checkUser } from '$lib/utils';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { projectsTable } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';

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

	return { project: qProject };
};

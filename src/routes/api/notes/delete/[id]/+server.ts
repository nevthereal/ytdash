import { db } from '$lib/server/db';
import { notesTable } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { RequestHandler } from './$types';
import { checkUser } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const user = checkUser(locals);
	const noteId = params.id;

	const qNote = await db.query.notesTable.findFirst({
		where: eq(notesTable.id, noteId)
	});

	if (!qNote) return error(404, 'Note not found.');

	if (qNote.authorId != user.id) error(401, 'Not your note.');

	await db
		.delete(notesTable)
		.where(and(eq(notesTable.id, noteId), eq(notesTable.authorId, user.id)));

	return new Response();
};

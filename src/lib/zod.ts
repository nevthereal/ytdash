import { z } from 'zod';

const prjTitle = z.string().min(3).max(24);

export const zAddProject = z.object({
	title: prjTitle
});

export const zEditProject = z.object({
	title: prjTitle,
	date: z.date().optional(),
	description: z.string().min(3).nullable().optional()
});

const noteContent = z.string().min(3);

export const zAddNote = z.object({
	content: noteContent
});

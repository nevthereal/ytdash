import { z } from 'zod';

const title = z.string().min(3).max(24);

export const zAddProject = z.object({
	title
});

export const zEditProject = z.object({
	title,
	date: z.date().optional(),
	description: z.string().min(3).nullable().optional()
});

export const zAddNote = z.object({
	content: z.string().min(3)
});

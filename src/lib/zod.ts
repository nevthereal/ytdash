import { z } from 'zod';

const title = z.string().min(3).max(16);

export const zAddProject = z.object({
	title,
	date: z.date().optional()
});

export const zEditProject = z.object({
	title,
	date: z.date().optional(),
	description: z.string().min(5).optional()
});

import { z } from 'zod';

export const zAddProject = z.object({
	title: z.string().min(3).max(16),
	date: z.date().optional()
});

export const zEditInfo = z.object({
	date: z.date().optional(),
	description: z.string().min(5).optional()
});

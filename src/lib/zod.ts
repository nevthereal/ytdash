import { z } from 'zod';

export const zNewProject = z.object({
	title: z.string().min(3)
});

import { zAddProject } from '$lib/zod';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	const addForm = await superValidate(zod(zAddProject));

	return { addForm };
};

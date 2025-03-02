import { redirect } from '@sveltejs/kit';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getUser(locals: App.Locals) {
	if (!locals.user) redirect(302, '/login');

	return locals.user;
}

import { generateRandomString } from '@oslojs/crypto/random';
import { redirect } from '@sveltejs/kit';
import type { RandomReader } from '@oslojs/crypto/random';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const random: RandomReader = {
	read(bytes: Uint8Array): void {
		crypto.getRandomValues(bytes);
	}
};

export function checkUser(locals: App.Locals) {
	if (!locals.user) redirect(302, '/login');

	return locals.user;
}

export function randomId(length: number) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
	return generateRandomString(random, alphabet, length);
}

export function prettyDate(date: string) {
	if (!dayjs(date).isValid()) return null;

	return dayjs(date).toDate().toLocaleDateString('en', {
		dateStyle: 'medium'
	});
}

dayjs.extend(relativeTime);

export function timeTo(date: string | Date) {
	if (!dayjs(date).isValid()) return null;

	return dayjs(date).fromNow();
}

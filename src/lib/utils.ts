import { generateRandomString } from '@oslojs/crypto/random';
import { redirect } from '@sveltejs/kit';
import type { RandomReader } from '@oslojs/crypto/random';

export const random: RandomReader = {
	read(bytes: Uint8Array): void {
		crypto.getRandomValues(bytes);
	}
};

export function checkUser(locals: App.Locals) {
	if (!locals.user) redirect(302, '/login');

	return locals.user;
}

export function randomId(lenght: number) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
	return generateRandomString(random, alphabet, lenght);
}

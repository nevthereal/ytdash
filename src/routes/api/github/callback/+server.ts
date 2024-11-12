import { generateSessionToken, createSession, setSessionTokenCookie } from '$lib/server/auth';
import { github } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { usersTable } from '$lib/server/db/schema';
import { randomId } from '$lib/utils';

import type { RequestEvent } from '@sveltejs/kit';
import type { OAuth2Tokens } from 'arctic';
import { eq } from 'drizzle-orm';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});

	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;
	const githubUsername = githubUser.login;

	// TODO: Replace this with your own DB query.
	const existingUser = await db.query.usersTable.findFirst({
		where: eq(usersTable.gitHubId, githubUserId)
	});

	if (existingUser) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	// TODO: Replace this with your own DB query.
	const newUser = await db
		.insert(usersTable)
		.values({
			id: randomId(16),
			gitHubId: githubUserId,
			username: githubUsername
		})
		.returning({ id: usersTable.id });

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, newUser[0].id);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}

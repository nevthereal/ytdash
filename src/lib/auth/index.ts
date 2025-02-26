import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import { GH_CLIENT_ID, GH_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	socialProviders: {
		github: {
			clientId: GH_CLIENT_ID,
			clientSecret: GH_CLIENT_SECRET
		}
	},
	user: {
		additionalFields: {
			role: {
				type: 'string',
				input: true,
				required: false
			},
			admin: {
				type: 'boolean',
				defaultValue: false,
				input: false
			},
			gender: {
				type: 'string',
				input: true,
				required: false
			}
		}
	}
});

export type Auth = typeof auth;
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;

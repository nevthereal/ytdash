import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.DATABASE_URL || !process.env.DATABASE_TOKEN)
	throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/lib/db/schema/*.sql.ts',
	out: './drizzle',

	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_TOKEN
	},

	verbose: true,
	strict: true,
	dialect: 'turso'
});

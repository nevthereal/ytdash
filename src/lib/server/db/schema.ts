import { boolean, date, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['To-do', 'In progress', 'Completed']);

export const usersTable = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	gitHubId: integer('github_id').notNull()
});

export const sessionsTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const projectsTable = pgTable('project', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	info: text('info'),
	date: date('date'),
	status: statusEnum('status').default('To-do'),
	url: text('url'),
	archived: boolean('archived'),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});

export const notesTable = pgTable('note', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	projectId: text('project_id')
		.references(() => projectsTable.id, { onDelete: 'cascade' })
		.notNull()
});

export type Session = typeof sessionsTable.$inferSelect;

export type User = typeof usersTable.$inferSelect;

export type Project = typeof projectsTable.$inferSelect;

import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['To-do', 'In progress', 'Completed']);

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const project = pgTable('project', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	info: text('info'),
	date: timestamp('date'),
	status: statusEnum('status'),
	url: text('url'),
	archived: boolean('archived'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' })
});

export const note = pgTable('note', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	projectId: text('project_id')
		.references(() => project.id, { onDelete: 'cascade' })
		.notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

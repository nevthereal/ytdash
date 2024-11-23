import {
	boolean,
	date,
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['To-do', 'In progress', 'Completed']);

export const usersTable = pgTable('user', {
	id: text().primaryKey(),
	username: text().notNull(),
	githubId: integer().notNull()
});

export const sessionsTable = pgTable('session', {
	id: text().primaryKey(),
	userId: text()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expiresAt: timestamp({ withTimezone: true, mode: 'date' }).notNull()
});

export const projectsTable = pgTable('project', {
	id: text().primaryKey(),
	title: text().notNull(),
	description: text(),
	date: date(),
	status: statusEnum().default('To-do'),
	url: text(),
	archived: boolean(),
	userId: text()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	createdAt: timestamp().$defaultFn(() => new Date())
});

export const notesTable = pgTable('note', {
	id: serial().primaryKey(),
	content: text().notNull(),
	projectId: text()
		.references(() => projectsTable.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp().$defaultFn(() => new Date())
});

export type Session = typeof sessionsTable.$inferSelect;

export type User = typeof usersTable.$inferSelect;

export type Project = typeof projectsTable.$inferSelect;

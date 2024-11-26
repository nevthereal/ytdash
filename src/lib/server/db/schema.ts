import { relations } from 'drizzle-orm';
import { boolean, date, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

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
	createdAt: timestamp()
		.$defaultFn(() => new Date())
		.notNull()
});

export const notesTable = pgTable('note', {
	id: text().primaryKey(),
	content: text().notNull(),
	projectId: text()
		.references(() => projectsTable.id, { onDelete: 'cascade' })
		.notNull(),
	updatedAt: timestamp()
		.$defaultFn(() => new Date())
		.notNull(),
	authorId: text()
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' })
});

export type Session = typeof sessionsTable.$inferSelect;

export type User = typeof usersTable.$inferSelect;

export type Project = typeof projectsTable.$inferSelect;

export type Note = typeof notesTable.$inferSelect;

// User Relations
export const userRelations = relations(usersTable, ({ one, many }) => ({
	sessions: many(sessionsTable),
	projects: many(projectsTable),
	notes: many(notesTable)
}));

// Session Relations
export const sessionRelations = relations(sessionsTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [sessionsTable.userId],
		references: [usersTable.id]
	})
}));

// Project Relations
export const projectRelations = relations(projectsTable, ({ one, many }) => ({
	user: one(usersTable, {
		fields: [projectsTable.userId],
		references: [usersTable.id]
	}),
	notes: many(notesTable)
}));

// Note Relations
export const noteRelations = relations(notesTable, ({ one }) => ({
	project: one(projectsTable, {
		fields: [notesTable.projectId],
		references: [projectsTable.id]
	}),
	author: one(usersTable, {
		fields: [notesTable.authorId],
		references: [usersTable.id]
	})
}));

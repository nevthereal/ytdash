import { pgTable, text, pgEnum, timestamp, serial } from 'drizzle-orm/pg-core';
import { user } from './auth.sql';

export const projectStatusEnum = pgEnum('status', [
	'todo',
	're-record',
	'in-progress',
	'done',
	'scrap'
]);

export const project = pgTable('project', {
	id: serial().primaryKey(),
	title: text().notNull(),
	date: timestamp(),
	status: projectStatusEnum().default('todo').notNull(),
	ownerId: text().references(() => user.id, { onDelete: 'cascade' })
});

export type Project = typeof project.$inferSelect;

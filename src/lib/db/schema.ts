import { generateCode } from '@nevthereal/random-utils';
import { pgTable, text, integer, pgEnum, timestamp, serial } from 'drizzle-orm/pg-core';

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
	status: projectStatusEnum().default('in-progress').notNull()
});

export type Project = typeof project.$inferSelect;

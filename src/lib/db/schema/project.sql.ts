import { user } from './auth.sql';
import { sqliteTable, text, int } from 'drizzle-orm/sqlite-core';

export const project = sqliteTable('project', {
	id: int().primaryKey(),
	title: text().notNull(),
	date: int({ mode: 'timestamp' }),
	status: text({ enum: ['To Do', 'Re Record', 'In Progress', 'Done', 'Scrap'] })
		.default('To Do')
		.notNull(),
	ownerId: text().references(() => user.id, { onDelete: 'cascade' })
});

export type Project = typeof project.$inferSelect;

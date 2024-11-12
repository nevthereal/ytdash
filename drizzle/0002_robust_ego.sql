ALTER TABLE "project" ALTER COLUMN "status" SET DEFAULT 'To-do';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "github_id" integer NOT NULL;
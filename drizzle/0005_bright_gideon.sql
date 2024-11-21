ALTER TABLE "project" RENAME COLUMN "info" TO "description";--> statement-breakpoint
ALTER TABLE "note" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "created_at" timestamp;
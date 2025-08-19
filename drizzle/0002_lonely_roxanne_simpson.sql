ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
ALTER TABLE "notes" DROP CONSTRAINT "notes_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" SET DEFAULT '4cJJqrHrsMOz';--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "organization_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "created_by_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" ADD COLUMN "last_updated_by_id" text;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_created_by_id_member_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_last_updated_by_id_member_id_fk" FOREIGN KEY ("last_updated_by_id") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN "is_favorite";--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN "user_id";
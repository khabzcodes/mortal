ALTER TABLE "note_activities" DROP CONSTRAINT "note_activities_user_id_notes_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" SET DEFAULT 'UoYGsgeHLaqy';--> statement-breakpoint
ALTER TABLE "note_activities" ADD CONSTRAINT "note_activities_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
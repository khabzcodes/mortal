CREATE TABLE "contributors" (
	"id" text PRIMARY KEY NOT NULL,
	"note_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contributions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "contributions" CASCADE;--> statement-breakpoint
ALTER TABLE "notes" ALTER COLUMN "id" SET DEFAULT '9OWTGXtPs6gU';--> statement-breakpoint
ALTER TABLE "contributors" ADD CONSTRAINT "contributors_note_id_notes_id_fk" FOREIGN KEY ("note_id") REFERENCES "public"."notes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contributors" ADD CONSTRAINT "contributors_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
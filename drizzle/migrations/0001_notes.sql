CREATE TABLE "notes" (
	"id" text PRIMARY KEY DEFAULT '-wQSnXvuZcbT' NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"content" text,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
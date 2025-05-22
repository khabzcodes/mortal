ALTER TABLE "notes" ALTER COLUMN "id" SET DEFAULT '-d_UVqgNKpr3';--> statement-breakpoint
ALTER TABLE "contributions" DROP COLUMN "privilege";--> statement-breakpoint
DROP TYPE "public"."privileges";
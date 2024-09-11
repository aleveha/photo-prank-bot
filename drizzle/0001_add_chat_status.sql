DO
$$
    BEGIN
        CREATE TYPE "public"."chat_status" AS ENUM ('warned', 'banned');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END
$$;
--> statement-breakpoint
ALTER TABLE "chat"
    ADD COLUMN "status" "chat_status";

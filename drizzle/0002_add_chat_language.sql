DO
$$
    BEGIN
        CREATE TYPE "public"."chat_language" AS ENUM ('en', 'ru');
    EXCEPTION
        WHEN duplicate_object THEN null;
    END
$$;
--> statement-breakpoint
ALTER TABLE "chat"
    ADD COLUMN "language" "chat_language";

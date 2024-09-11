import { bigint, pgEnum, pgTable } from "drizzle-orm/pg-core";
import { LOCALES, type Locale } from "~/configs/i18n";

const CHAT_STATUSES = ["warned", "banned"] as const;
type ChatStatus = (typeof CHAT_STATUSES)[number];

export const chatStatusEnum = pgEnum("chat_status", CHAT_STATUSES);
export const chatLanguageEnum = pgEnum("chat_language", LOCALES);

export const chat = pgTable("chat", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	status: chatStatusEnum("status").$type<ChatStatus>(),
	language: chatLanguageEnum("language").$type<Locale>(),
});

export type InsertChat = typeof chat.$inferInsert;

export const schema = { chat };

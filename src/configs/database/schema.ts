import { bigint, pgEnum, pgTable } from "drizzle-orm/pg-core";

const CHAT_STATUSES = ["warned", "banned"] as const;
type ChatStatus = (typeof CHAT_STATUSES)[number];

export const chatStatusEnum = pgEnum("chat_status", CHAT_STATUSES);

export const chat = pgTable("chat", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	status: chatStatusEnum("status").$type<ChatStatus>(),
});

export type InsertChat = typeof chat.$inferInsert;

export const schema = { chat };

import { bigint, pgTable } from "drizzle-orm/pg-core";

export const chat = pgTable("chat", {
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
});

export const schema = { chat };

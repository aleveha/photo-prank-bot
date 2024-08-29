import { sql } from "drizzle-orm";
import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { database, schema } from "~/configs/database";

const insertChatQuery = database
	.insert(schema.chat)
	.values({ id: sql.placeholder("chatId") })
	.onConflictDoNothing()
	.prepare("insertChat");

export async function verification(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	try {
		await insertChatQuery.execute({ chatId: ctx.chat.id });
	} catch (error) {
		console.error("Error inserting chat into database:", error);
	}

	await next();
}

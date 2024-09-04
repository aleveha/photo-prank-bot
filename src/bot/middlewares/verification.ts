import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { addChat } from "~/services/chat.service";

export async function verification(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	const isChatAdded = await addChat(ctx.chat.id);
	if (!isChatAdded) {
		return;
	}

	await next();
}

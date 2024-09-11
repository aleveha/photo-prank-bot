import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { addChat, getChat } from "~/services/chat.service";

export async function verification(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	const chat = await getChat(ctx.chat.id);
	if (chat) {
		if (chat.status === "banned") {
			await ctx.reply(ctx.t("restrict-command.ban-message"));
			return;
		}

		await next();
		return;
	}

	if (chat === null) {
		return;
	}

	const isChatAdded = await addChat(ctx.chat.id);
	if (!isChatAdded) {
		return;
	}

	await next();
}

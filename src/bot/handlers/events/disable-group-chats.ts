import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { deleteChat } from "~/services/chat.service";

export async function disableGroupChats(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	if (ctx.chat.type === "private") {
		await next();
		return;
	}

	if (ctx.chat.id === envs.ADMIN_CHAT_ID) {
		await next();
		return;
	}

	try {
		await ctx.reply("This bot is only available in private chats");
		await ctx.leaveChat();
		await deleteChat(ctx.chat.id);
	} catch (err) {
		if (!(err instanceof Error)) {
			throw err;
		}

		const messages = ["bot is not a member", "bot was kicked"];
		if (!messages.some((message) => err.message.includes(message))) {
			console.error(`Tried to leave group chat ${ctx.chat.id} but failed with:\n`, err);
		}
	}
}

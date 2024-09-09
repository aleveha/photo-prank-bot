import { InlineKeyboard, type NextFunction } from "grammy";
import type { Context } from "~/bot/types";

export async function privateChatOnly(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	if (ctx.chat.type === "private") {
		await next();
		return;
	}

	try {
		await ctx.reply(ctx.t("disable-group-chats-event.message"), {
			reply_markup: new InlineKeyboard().url(
				ctx.t("disable-group-chats-event.button"),
				`https://t.me/${ctx.me.username}?start=`,
			),
		});
	} catch (err) {
		if (!(err instanceof Error)) {
			throw err;
		}

		if (!["bot is not a member", "bot was kicked"].some((message) => err.message.includes(message))) {
			console.error(`Tried to leave group chat ${ctx.chat.id} but failed with:\n`, err);
		}
	}
}

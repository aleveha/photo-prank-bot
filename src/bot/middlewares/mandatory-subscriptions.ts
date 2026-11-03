import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { subgram } from "../services/subgram";

export async function mandatorySubscriptions(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	try {
		const subscribed = await subgram.isSubscribed({
			chatId: ctx.chat.id,
			userId: ctx.chat.id
		});
		if (!subscribed) {
			return;
		}
	} catch (err) {
		console.error("[mandatorySubscriptions]: subgram check failed, continuing:", err);
	}

	await next();
}

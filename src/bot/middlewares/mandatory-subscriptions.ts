import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { subgram } from "../services/subgram";

export async function mandatorySubscriptions(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	if (envs.isDevelopment) {
		console.info("[mandatorySubscriptions]: skipping Subgram in development");
		await next();
		return;
	}

	if (ctx.chat.type !== "private" || !ctx.from) {
		await next();
		return;
	}

	try {
		const subscribed = await subgram.isSubscribed({
			chatId: ctx.chat.id,
			userId: ctx.from.id
		});
		if (!subscribed) {
			return;
		}
	} catch (err) {
		console.error("[mandatorySubscriptions]: subgram check failed, continuing:", err);
	}

	await next();
}

import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import flyer from "../services/flyer";

export async function mandatorySubscriptions(ctx: Context, next: NextFunction) {
	if (!ctx.chat) {
		return;
	}

	try {
		const checkResponse = await flyer.check({ userId: ctx.chat.id });
		if (!checkResponse.skip) {
			return;
		}
	} catch (err) {
		console.error("[mandatorySubscriptions]: flyer check failed, continuing:", err);
	}

	await next();
}

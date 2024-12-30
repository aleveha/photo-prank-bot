import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import flyer from "../services/flyer";

export async function mandatorySubscriptions(ctx: Context, next: NextFunction) {
	if (!ctx.from) {
		return;
	}

	const checkResponse = await flyer.check({ userId: ctx.from.id });
	if (!checkResponse.skip) {
		return;
	}

	await next();
}

import type { NextFunction } from "grammy";
import type { Context } from "~/bot/types";

export async function answerCallbackQuery(ctx: Context, next: NextFunction) {
	await ctx.answerCallbackQuery();
	await next();
}

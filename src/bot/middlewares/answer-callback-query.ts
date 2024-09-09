import { GrammyError, type NextFunction } from "grammy";
import type { Context } from "~/bot/types";

export async function answerCallbackQuery(ctx: Context, next: NextFunction) {
	try {
		await ctx.answerCallbackQuery();
	} catch (err) {
		if (!(err instanceof GrammyError)) {
			throw err;
		}

		if (err.message.includes("query is too old") && !!ctx.msg?.reply_markup) {
			await ctx.editMessageReplyMarkup(undefined);
			return;
		}

		console.error(err);
	}
	await next();
}

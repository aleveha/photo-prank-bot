import type { CallbackQueryContext, NextFunction } from "grammy";
import { DEFAULT_RATE_LIMITER_CONFIG } from "~/bot/middlewares/rate-limiter";
import type { Context } from "~/bot/types";
import { REPORT_VALUES } from "./constants";

export async function reportCallbackRateLimitExceeded(ctx: CallbackQueryContext<Context>, next: NextFunction) {
	DEFAULT_RATE_LIMITER_CONFIG.onLimitExceeded(ctx);

	const callbackData = typeof ctx.match === "string" ? ctx.match : ctx.match[0];
	if (!callbackData.includes(REPORT_VALUES.do)) {
		await next();
		return;
	}

	await ctx.reply(ctx.t("report-command.rate-limit-message"));
}

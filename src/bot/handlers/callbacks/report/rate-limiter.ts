import type { CallbackQueryContext } from "grammy";
import { DEFAULT_RATE_LIMITER_CONFIG } from "~/bot/middlewares/rate-limiter";
import type { Context } from "~/bot/types";

export async function reportCallbackRateLimitExceeded(ctx: CallbackQueryContext<Context>) {
	DEFAULT_RATE_LIMITER_CONFIG.onLimitExceeded(ctx);

	await ctx.reply(ctx.t("report-command.rate-limit-message"), { parse_mode: "HTML" });
}

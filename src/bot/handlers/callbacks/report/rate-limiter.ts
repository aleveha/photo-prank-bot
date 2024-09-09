import type { CallbackQueryContext } from "grammy";
import { DEFAULT_RATE_LIMITER_CONFIG } from "~/bot/middlewares/rate-limiter";
import type { Context } from "~/bot/types";

export async function reportCallbackRateLimitExceeded(ctx: CallbackQueryContext<Context>) {
	DEFAULT_RATE_LIMITER_CONFIG.onLimitExceeded(ctx);

	await ctx.reply(ctx.t("report-command.rate-limit-message"), {
		parse_mode: "HTML",
		reply_parameters: ctx.msg?.message_id
			? {
					allow_sending_without_reply: true,
					message_id: ctx.msg.message_id,
				}
			: undefined,
	});
}

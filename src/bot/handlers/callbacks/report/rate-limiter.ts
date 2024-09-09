import type { CallbackQueryContext } from "grammy";
import type { Context } from "~/bot/types";

export async function reportCallbackRateLimitExceeded(ctx: CallbackQueryContext<Context>) {
	console.warn("Report rate limit exceeded", ctx.from?.id);
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

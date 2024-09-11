import type { CallbackQueryContext, NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";

export async function reportChatOnly(ctx: CallbackQueryContext<Context>, next: NextFunction) {
	if (ctx.chat?.id !== envs.REPORT_CHAT_ID) {
		return;
	}

	await next();
}

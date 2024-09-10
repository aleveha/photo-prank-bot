import type { CallbackQueryContext } from "grammy";
import type { Context } from "~/bot/types";
import { generateLinks } from "../utils/links-generator";

export async function links(ctx: CallbackQueryContext<Context>) {
	if (!ctx.chat) {
		return;
	}

	await ctx.reply(ctx.t("links-command") + "\n\n" + generateLinks(ctx.chat.id));
}

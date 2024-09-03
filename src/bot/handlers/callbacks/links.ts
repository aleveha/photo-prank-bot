import type { CallbackQueryContext } from "grammy";
import type { Context } from "~/bot/types";
import { generateLinks } from "../utils/links-generator";

export async function links(ctx: CallbackQueryContext<Context>) {
	await ctx.answerCallbackQuery();

	if (!ctx.chat) {
		return;
	}

	const socialMediasMessage = generateLinks(ctx.chat.id);

	await ctx.reply(ctx.t("links-command") + "\n\n" + socialMediasMessage, { parse_mode: "HTML" });
}

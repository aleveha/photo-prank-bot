import { type CommandContext, InlineKeyboard } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";

export async function start(ctx: CommandContext<Context>) {
	await ctx.reply(ctx.t("start-command.message"), {
		parse_mode: "HTML",
		reply_markup: new InlineKeyboard()
			.text(ctx.t("start-command.get-links-button"), "links")
			.row()
			.url(ctx.t("start-command.privacy-policy-button"), `https://${envs.APP_URL}/privacy-policy`)
			.row()
			.url(ctx.t("start-command.channel-button"), "https://t.me/make_them_smile_channel")
			.url(ctx.t("start-command.chat-button"), "https://t.me/make_them_smile_chat"),
	});
}

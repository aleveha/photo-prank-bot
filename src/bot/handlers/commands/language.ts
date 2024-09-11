import { type CommandContext, InlineKeyboard } from "grammy";
import type { Context } from "~/bot/types";

export async function language(ctx: CommandContext<Context>) {
	await ctx.reply(ctx.t("language-command.choose-option-message"), {
		reply_markup: new InlineKeyboard()
			.text(ctx.t("language-command.en-button"), "language:en")
			.text(ctx.t("language-command.ru-button"), "language:ru"),
	});
}

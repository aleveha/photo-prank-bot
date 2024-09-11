import type { CallbackQueryContext } from "grammy";
import type { Context } from "~/bot/types";
import type { Locale } from "~/configs/i18n";
import { getChat, updateChat } from "~/services/chat.service";

export async function language(ctx: CallbackQueryContext<Context>) {
	const [, locale] = (typeof ctx.match === "string" ? ctx.match : ctx.match[0]).split(":") as ["language", Locale];
	const chat = await getChat(ctx.from.id);
	if (!chat) {
		return;
	}

	if (chat.language === locale) {
		await ctx.reply(ctx.t("language-command.same-language-message"));
		return;
	}

	const updatedChat = await updateChat(ctx.from.id, { language: locale });
	if (!updatedChat) {
		await ctx.reply(ctx.t("language-command.error-message"));
		return;
	}

	await ctx.i18n.renegotiateLocale();
	await ctx.editMessageText(ctx.t("language-command.success-message"), { reply_markup: undefined });
}

import type { CallbackQueryContext } from "grammy";
import { bot } from "~/bot";
import { i18n } from "~/bot/configs/i18n";
import type { Context } from "~/bot/types";
import { DEFAULT_LOCALE } from "~/configs/i18n";
import { getChat, updateChat } from "~/services/chat.service";

export async function restrictCallbackQuery(ctx: CallbackQueryContext<Context>) {
	const callbackData = typeof ctx.match === "string" ? ctx.match : ctx.match[0];
	const [action, _chatId] = callbackData.split(":") as ["warn" | "ban", string];
	const chatId = Number.parseInt(_chatId);

	const chat = await getChat(chatId);

	if (chat === null) {
		await ctx.reply(ctx.t("restrict-command.database-error-message"));
		return;
	}

	if (chat === undefined) {
		await ctx.reply(ctx.t("restrict-command.chat-not-found-message"));
		return;
	}

	if (chat.status === "banned") {
		await ctx.editMessageCaption({
			caption: ctx.t("restrict-command.already-banned-message") + "\n\n" + ctx.msg?.caption,
			reply_markup: undefined,
		});
		return;
	}

	const { user } = await ctx.api.getChatMember(chatId, chatId);

	// use line below when grammy-autoquote plugin is updated
	// await ctx.api.sendMessage(chat.id, i18n.t(user.language_code ?? DEFAULT_LOCALE, "restrict-command.warning-message"), { reply_parameters: undefined });
	await bot.api.sendMessage(
		chat.id,
		i18n.t(
			user.language_code ?? DEFAULT_LOCALE,
			action === "warn" ? "restrict-command.warning-message" : "restrict-command.ban-message",
		),
	);

	if (chat.status === "warned" && action === "warn") {
		await ctx.reply(ctx.t("restrict-command.already-warned-message"));
		return;
	}

	const updatedChat = await updateChat(chat.id, { status: action === "warn" ? "warned" : "banned" });

	if (updatedChat === null) {
		await ctx.reply(ctx.t("restrict-command.database-error-message"));
		return;
	}

	if (updatedChat === undefined) {
		await ctx.reply(ctx.t("restrict-command.chat-not-found-message"));
		return;
	}

	if (action === "warn") {
		await ctx.reply(ctx.t("restrict-command.successfully-warned-message"));
		return;
	}

	await ctx.editMessageCaption({
		caption: ctx.t("restrict-command.successfully-banned-message") + "\n\n" + ctx.msg?.caption,
		reply_markup: undefined,
	});
}

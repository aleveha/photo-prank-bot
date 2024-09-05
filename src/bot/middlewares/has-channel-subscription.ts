import { InlineKeyboard, type NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { subscribedToChannel } from "../utils/subscribed-to-channel";

export async function hasChannelSubscription(ctx: Context, next: NextFunction) {
	if (!ctx.from) {
		return;
	}

	const subscribed = await subscribedToChannel(envs.CHANNEL_ID, ctx.from.id);
	if (!subscribed) {
		await ctx.reply(ctx.t("subscription-check.message"), {
			parse_mode: "HTML",
			reply_markup: new InlineKeyboard()
				.url(ctx.t("subscription-check.subscribe-button"), `https://t.me/${envs.CHANNEL_ID}`)
				.row()
				.text(ctx.t("subscription-check.check-button"), "links"),
		});
		return;
	}

	const isCheckMessage = ctx.msg?.reply_markup?.inline_keyboard.some((row) =>
		row.some((button) => button.text === ctx.t("subscription-check.check-button")),
	);
	if (isCheckMessage) {
		try {
			await ctx.deleteMessage();
		} catch (_) {
			console.warn(`Failed to delete check subscription message for user ${ctx.from.id}`);
		}
	}

	await next();
}

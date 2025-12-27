import { type CommandContext, InlineKeyboard } from "grammy";
import { AdminService } from "~/bot/services/admin";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { PromoService } from "~/services/promo.service";

export default async function handler(ctx: CommandContext<Context>) {
	const referral = ctx.msg.text.split(" ").at(1);
	if (referral) {
		await PromoService.add(referral, ctx.chat.id);
	}

	await AdminService.miniAds.send(ctx.chat.id, "greeting");

	await ctx.reply(ctx.t("start-command.message"), {
		reply_markup: new InlineKeyboard()
			.text(ctx.t("start-command.get-links-button"), "links")
			.row()
			.url(
				ctx.t("start-command.add-to-group-chat-button"),
				`https://t.me/${envs.NEXT_PUBLIC_BOT_NAME}?startgroup=start-command`
			)
			.row()
			.url(ctx.t("start-command.privacy-policy-button"), `https://${envs.APP_URL}/privacy-policy`)
			.row()
			.url(ctx.t("start-command.channel-button"), `https://t.me/${envs.CHANNEL_ID}`)
			.url(ctx.t("start-command.chat-button"), "https://t.me/make_them_smile_chat")
	});
}

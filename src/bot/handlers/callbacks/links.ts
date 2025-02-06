import type { CallbackQueryContext } from "grammy";
import { AdminService } from "~/bot/services/admin";
import type { Context } from "~/bot/types";
import { generateLinks } from "~/bot/utils/links-generator";

export async function links(ctx: CallbackQueryContext<Context>) {
	if (!ctx.chat) {
		return;
	}

	await ctx.reply(ctx.t("links-command.message") + "\n\n" + generateLinks(ctx.chat.id));
	await AdminService.miniAds.send(ctx.chat.id);
}

import type { CommandContext } from "grammy";
import { AdminService } from "~/bot/services/admin";
import type { Context } from "~/bot/types";
import { generateLinks } from "~/bot/utils/links-generator";

export default async function handler(ctx: CommandContext<Context>) {
	await ctx.reply(ctx.t("links-command.message") + "\n\n" + generateLinks(ctx.chat.id));
	await AdminService.miniAds.send(ctx.chat.id);
}

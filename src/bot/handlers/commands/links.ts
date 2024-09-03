import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";
import { generateLinks } from "../utils/links-generator";

export async function links(ctx: CommandContext<Context>) {
	const socialMediasMessage = generateLinks(ctx.chat.id);

	await ctx.reply(ctx.t("links-command") + "\n\n" + socialMediasMessage, { parse_mode: "HTML" });
}

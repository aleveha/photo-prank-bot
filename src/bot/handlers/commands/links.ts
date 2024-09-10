import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";
import { generateLinks } from "../utils/links-generator";

export async function links(ctx: CommandContext<Context>) {
	await ctx.reply(ctx.t("links-command") + "\n\n" + generateLinks(ctx.chat.id));
}

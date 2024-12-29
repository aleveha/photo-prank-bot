import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";
import { generateLinks } from "../../utils/links-generator";

export default async function handler(ctx: CommandContext<Context>) {
	await ctx.reply(ctx.t("links-command.message") + "\n\n" + generateLinks(ctx.chat.id));
}

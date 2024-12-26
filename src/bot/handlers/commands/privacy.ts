import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";

export default async function handler(ctx: CommandContext<Context>) {
	await ctx.reply(ctx.t("privacy-command.message", { url: `https://${envs.APP_URL}/privacy-policy` }));
}

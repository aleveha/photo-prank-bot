import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";

type PrivacyPolicyContext = CommandContext<Context>;

export async function privacyPolicy(ctx: PrivacyPolicyContext) {
	await ctx.reply(ctx.t("privacy-policy-command", { url: `https://${envs.APP_URL}/privacy-policy` }), {
		parse_mode: "HTML",
	});
}

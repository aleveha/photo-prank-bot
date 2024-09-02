import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";

type PrivacyPolicyContext = CommandContext<Context>;

export async function privacyPolicy(ctx: PrivacyPolicyContext) {
	await ctx.reply(ctx.t("privacy-policy-command"), { parse_mode: "HTML" });
}

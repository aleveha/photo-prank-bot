import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";

type StartContext = CommandContext<Context>;

export async function start(ctx: StartContext) {
	const link = `${envs.APP_URL}/${ctx.chat.id}`;

	await ctx.reply(
		ctx.t("start-command") +
			"\n\n" +
			"Google:\n" +
			`https://google.${link}\n\n` +
			"Instagram:\n" +
			`https://instagram.${link}\n\n` +
			"Tiktok:\n" +
			`https://tiktok.${link}\n\n` +
			"Snapchat:\n" +
			`https://snapchat.${link}\n\n` +
			"Kurdcinema:\n" +
			`https://kurdcinema.${link}\n\n`,
	);
}

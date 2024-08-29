import { autoRetry } from "@grammyjs/auto-retry";
import { limit } from "@grammyjs/ratelimiter";
import { Bot } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { start } from "./handlers/commands/start";

// bot instance
export const bot = new Bot<Context>(envs.TELEGRAM_TOKEN);

// transformers
bot.api.config.use(autoRetry());

// middlewares
bot.use(
	limit({
		onLimitExceeded: (ctx) => console.warn("Rate limit exceeded", ctx.from?.id),
	}),
);

// commands
bot.command("start", start);

// error handling
bot.errorBoundary((error) => console.error("An error occurred in the bot:", error));

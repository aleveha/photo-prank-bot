import { autoRetry } from "@grammyjs/auto-retry";
import { limit } from "@grammyjs/ratelimiter";
import { Bot } from "grammy";
import { envs } from "~/configs/envs";
import { i18n } from "./configs/i18n";
import { links as linksCallback } from "./handlers/callbacks/links";
import { reportCallback, reportCallbackRateLimitExceeded } from "./handlers/callbacks/report";
import { links as linksCommand } from "./handlers/commands/links";
import { privacyPolicy } from "./handlers/commands/privacy-policy";
import { start } from "./handlers/commands/start";
import { myChatMember } from "./handlers/events/my-chat-member";
import { newChatMembers } from "./handlers/events/new-chat-members";
import { answerCallbackQuery } from "./middlewares/answer-callback-query";
import { hasChannelSubscription } from "./middlewares/has-channel-subscription";
import { ignoreGroupChats } from "./middlewares/ignore-group-chats";
import { DEFAULT_RATE_LIMITER_CONFIG } from "./middlewares/rate-limiter";
import { verification } from "./middlewares/verification";
import type { Context } from "./types";

export const bot = new Bot<Context>(envs.TELEGRAM_TOKEN);

bot.api.config.use(autoRetry());

bot.use(i18n);

bot.on("my_chat_member", myChatMember);
bot.on("message:new_chat_members", newChatMembers).use(ignoreGroupChats).use(verification);

bot.command("start").use(limit(DEFAULT_RATE_LIMITER_CONFIG)).use(ignoreGroupChats).use(verification).use(start);
bot.command("links")
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(ignoreGroupChats)
	.use(verification)
	.use(hasChannelSubscription)
	.use(linksCommand);
bot.command("privacy")
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(ignoreGroupChats)
	.use(verification)
	.use(privacyPolicy);

bot.callbackQuery("links")
	.use(answerCallbackQuery)
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(ignoreGroupChats)
	.use(verification)
	.use(hasChannelSubscription)
	.use(linksCallback);

bot.callbackQuery(["report", "report:0", "report:1"])
	.use(answerCallbackQuery)
	.use(ignoreGroupChats)
	.use(
		limit({
			onLimitExceeded: reportCallbackRateLimitExceeded,
			timeFrame: 15_000,
			keyGenerator: (ctx) => `${ctx.chat?.id}_${ctx.match}`,
		}),
	)
	.use(verification)
	.use(reportCallback);

bot.errorBoundary((error) => console.error("An error occurred in the bot:", error));

import { autoRetry } from "@grammyjs/auto-retry";
import { parseMode } from "@grammyjs/parse-mode";
import { limit } from "@grammyjs/ratelimiter";
import { autoQuote } from "@roziscoding/grammy-autoquote";
import { Bot } from "grammy";
import { envs } from "~/configs/envs";
import { LOCALES } from "~/configs/i18n";
import { i18n } from "./configs/i18n";
import { language as languageCallback } from "./handlers/callbacks/language";
import { links as linksCallback } from "./handlers/callbacks/links";
import {
	REPORT_CALLBACK_QUERY_TRIGGER,
	reportCallback,
	reportCallbackRateLimitExceeded,
} from "./handlers/callbacks/report";
import { restrictCallbackQuery } from "./handlers/callbacks/restrict";
import { language as languageCommand } from "./handlers/commands/language";
import { links as linksCommand } from "./handlers/commands/links";
import { privacyPolicy } from "./handlers/commands/privacy-policy";
import { start } from "./handlers/commands/start";
import { myChatMember } from "./handlers/events/my-chat-member";
import { newChatMembers } from "./handlers/events/new-chat-members";
import { answerCallbackQuery } from "./middlewares/answer-callback-query";
import { hasChannelSubscription } from "./middlewares/has-channel-subscription";
import { privateChatOnly } from "./middlewares/private-chat-only";
import { DEFAULT_RATE_LIMITER_CONFIG } from "./middlewares/rate-limiter";
import { reportChatOnly } from "./middlewares/report-chat-only";
import { verification } from "./middlewares/verification";
import type { Context } from "./types";

export const bot = new Bot<Context>(envs.TELEGRAM_TOKEN);

bot.api.config.use(autoRetry());
bot.api.config.use(parseMode("HTML"));

bot.use(i18n);
bot.use(autoQuote({ allowSendingWithoutReply: true }));

bot.on("my_chat_member", myChatMember);
bot.on("message:new_chat_members", newChatMembers).use(privateChatOnly).use(verification);

bot.command("start").use(limit(DEFAULT_RATE_LIMITER_CONFIG)).use(privateChatOnly).use(verification).use(start);

bot.command("links")
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(privateChatOnly)
	.use(verification)
	.use(hasChannelSubscription)
	.use(linksCommand);

bot.command("privacy")
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(privateChatOnly)
	.use(verification)
	.use(privacyPolicy);

bot.callbackQuery("links")
	.use(answerCallbackQuery)
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(privateChatOnly)
	.use(verification)
	.use(hasChannelSubscription)
	.use(linksCallback);

bot.command("language")
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(privateChatOnly)
	.use(verification)
	.use(languageCommand);

bot.callbackQuery(new RegExp(`language:(${LOCALES.join("|")})`))
	.use(answerCallbackQuery)
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(privateChatOnly)
	.use(verification)
	.use(languageCallback);

bot.callbackQuery(REPORT_CALLBACK_QUERY_TRIGGER)
	.use(answerCallbackQuery)
	.use(privateChatOnly)
	.use(
		limit({
			onLimitExceeded: reportCallbackRateLimitExceeded,
			timeFrame: 15_000,
			keyGenerator: (ctx) => `${ctx.chat?.id}_${ctx.match}`,
		}),
	)
	.use(verification)
	.use(reportCallback);

bot.callbackQuery([/warn:\d+/, /ban:\d+/g])
	.use(answerCallbackQuery)
	.use(reportChatOnly)
	.use(restrictCallbackQuery);

import { autoRetry } from "@grammyjs/auto-retry";
import { parseMode } from "@grammyjs/parse-mode";
import { limit } from "@grammyjs/ratelimiter";
import { autoQuote } from "@roziscoding/grammy-autoquote";
import { Bot } from "grammy";
import { envs } from "~/configs/envs";
import { LOCALES } from "~/configs/i18n";
import { PromoService } from "~/services/promo.service";
import { i18n } from "./configs/i18n";
import { language as languageCallback } from "./handlers/callbacks/language";
import { links as linksCallback } from "./handlers/callbacks/links";
import {
	REPORT_CALLBACK_QUERY_TRIGGER,
	reportCallback,
	reportCallbackRateLimitExceeded
} from "./handlers/callbacks/report";
import { restrictCallbackQuery } from "./handlers/callbacks/restrict";
import { COMMANDS } from "./handlers/commands";
import { myChatMember } from "./handlers/events/my-chat-member";
import { newChatMembers } from "./handlers/events/new-chat-members";
import {
	DEFAULT_RATE_LIMITER_CONFIG,
	answerCallbackQuery,
	mandatorySubscriptions,
	reportChatOnly,
	verification
} from "./middlewares";
import type { Context } from "./types";

export const bot = new Bot<Context>(envs.TELEGRAM_TOKEN);

bot.api.config.use(autoRetry());
bot.api.config.use(parseMode("HTML"));

bot.use(i18n);
bot.use(autoQuote({ allowSendingWithoutReply: true }));

bot.on("my_chat_member", myChatMember);
bot.on("message:new_chat_members", newChatMembers).use(verification);

bot.use(COMMANDS);

// TODO: replace when admin service is ready
bot.command("refs", async (ctx) => {
	const referral = ctx.msg.text.split(" ").at(1);
	if (!referral) {
		return;
	}

	const count = await PromoService.getCountByReferral(referral);
	if (!count) {
		return;
	}

	await ctx.reply(`All: ${count.all}\nPrivate: ${count.private}\nGroup: ${count.group}`);
});

bot.callbackQuery("links")
	.use(answerCallbackQuery)
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(verification)
	.use(mandatorySubscriptions)
	.use(linksCallback);

bot.callbackQuery(new RegExp(`language:(${LOCALES.join("|")})`))
	.use(answerCallbackQuery)
	.use(limit(DEFAULT_RATE_LIMITER_CONFIG))
	.use(verification)
	.use(languageCallback);

bot.callbackQuery(REPORT_CALLBACK_QUERY_TRIGGER)
	.use(answerCallbackQuery)
	.use(
		limit({
			onLimitExceeded: reportCallbackRateLimitExceeded,
			timeFrame: 15_000,
			keyGenerator: (ctx) => `${ctx.chat?.id}_${ctx.match}`
		})
	)
	.use(verification)
	.use(reportCallback);

bot.callbackQuery([/warn:-?\d+/, /ban:-?\d+/])
	.use(answerCallbackQuery)
	.use(reportChatOnly)
	.use(restrictCallbackQuery);

import { autoRetry } from "@grammyjs/auto-retry";
import { Bot } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { i18n } from "./configs/i18n";
import { privacyPolicy } from "./handlers/commands/privacy-policy";
import { start } from "./handlers/commands/start";
import { myChatMember } from "./handlers/events/my-chat-member";
import { newChatMembers } from "./handlers/events/new-chat-members";
import { ignoreGroupChats } from "./middlewares/ignore-group-chats";
import { rateLimiter } from "./middlewares/rate-limiter";
import { verification } from "./middlewares/verification";

export const bot = new Bot<Context>(envs.TELEGRAM_TOKEN);

bot.api.config.use(autoRetry());

bot.use(i18n);

bot.on("my_chat_member", myChatMember);
bot.on("message:new_chat_members", newChatMembers).use(ignoreGroupChats).use(verification);

bot.command("start").use(rateLimiter).use(ignoreGroupChats).use(verification).use(start);
bot.command("privacy").use(rateLimiter).use(ignoreGroupChats).use(verification).use(privacyPolicy);

bot.errorBoundary((error) => console.error("An error occurred in the bot:", error));

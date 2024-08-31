import { autoRetry } from "@grammyjs/auto-retry";
import { Bot } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { start } from "./handlers/commands/start";
import { disableGroupChats } from "./handlers/events/disable-group-chats";
import { myChatMember } from "./handlers/events/my-chat-member";
import { newChatMembers } from "./handlers/events/new-chat-members";
import { rateLimiter } from "./middlewares/rate-limiter";
import { verification } from "./middlewares/verification";

export const bot = new Bot<Context>(envs.TELEGRAM_TOKEN);

bot.api.config.use(autoRetry());

bot.use(disableGroupChats);

bot.on("my_chat_member", myChatMember);
bot.on("message:new_chat_members", newChatMembers).use(verification);

bot.command("start").use(rateLimiter).use(verification).use(start);

bot.errorBoundary((error) => console.error("An error occurred in the bot:", error));

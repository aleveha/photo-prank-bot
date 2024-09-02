import type { Filter, NextFunction } from "grammy";
import type { Context } from "~/bot/types";

export async function newChatMembers(ctx: Filter<Context, "message:new_chat_members">, next: NextFunction) {
	const isThisBot = ctx.message.new_chat_members.map((member) => member.id).includes(ctx.me.id);
	if (!isThisBot) {
		return;
	}

	await next();
}

import type { Filter, NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { deleteChat } from "~/services/chat.service";

export async function myChatMember(ctx: Filter<Context, "my_chat_member">, next: NextFunction) {
	const member = ctx.myChatMember.new_chat_member;

	if (member.user.id !== ctx.me.id) {
		await next();
		return;
	}

	if (member.status === "kicked" || member.status === "left") {
		await deleteChat(ctx.chat.id);
		return;
	}

	if (member.status === "restricted") {
		if (member.can_send_photos && member.can_send_messages) {
			await next();
			return;
		}

		if (!member.can_send_photos && member.can_send_messages) {
			await ctx.reply(ctx.t("my-chat-member-event"));
			return;
		}

		await ctx.leaveChat();
		await deleteChat(ctx.chat.id);
		return;
	}

	await next();
}

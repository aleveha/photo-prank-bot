import { eq, sql } from "drizzle-orm";
import type { Filter, NextFunction } from "grammy";
import type { Context } from "~/bot/types";
import { database, schema } from "~/configs/database";

const deleteChatQuery = database
	.delete(schema.chat)
	.where(eq(schema.chat.id, sql.placeholder("chatId")))
	.prepare("deleteChatQuery");

async function deleteChat(chatId: number) {
	try {
		await deleteChatQuery.execute({ chatId });
	} catch (err) {
		console.error("Failed to delete chat", err);
	}
}

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
			await ctx.reply(
				"*WARNING*\n\n" +
					"You have restricted me from sending photos\\!\n\n" +
					"Please note, *I can't function properly without this permission\\!*",
				{
					parse_mode: "MarkdownV2",
				},
			);
			return;
		}

		await ctx.leaveChat();
		await deleteChat(ctx.chat.id);
		return;
	}

	await next();
}

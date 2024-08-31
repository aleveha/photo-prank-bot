"use server";

import { bot } from "~/bot";
import { deleteChat } from "~/services/chat.service";

export async function checkChat(chatId: number) {
	try {
		await bot.api.sendChatAction(chatId, "upload_photo");

		return true;
	} catch (err) {
		console.warn(`Failed to access chat ${chatId}:\n`, err);
		await deleteChat(chatId);

		return false;
	}
}

import { bot } from "~/bot";
import { deleteChat } from "~/services/chat.service";

export async function checkChatAccessibility(chatId: number, showWarning = true) {
	try {
		await bot.api.sendChatAction(chatId, "upload_photo");

		return true;
	} catch (err) {
		if (showWarning) {
			console.warn(`Failed to access chat ${chatId}:\n`, err);
		}
		await deleteChat(chatId);

		return false;
	}
}

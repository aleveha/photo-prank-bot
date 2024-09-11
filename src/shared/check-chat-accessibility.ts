import { bot } from "~/bot";
import { deleteChat, getChat } from "~/services/chat.service";

export async function checkChatAccessibility(chatId: number, showWarning = true) {
	const chat = await getChat(chatId);
	if (chat?.status === "banned") {
		return false;
	}

	try {
		return await bot.api.sendChatAction(chatId, "upload_photo");
	} catch (err) {
		if (showWarning) {
			console.warn(`Failed to access chat ${chatId}:\n`, err);
		}
		await deleteChat(chatId);

		return false;
	}
}

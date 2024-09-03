import { bot } from "~/bot";
import { deleteChat, getAllChats } from "~/services/chat.service";
import { checkChatAccessibility } from "~/shared/check-chat-accessibility";

const allChats = await getAllChats();
if (!allChats) {
	console.error("Failed to get chats from database");
	process.exit(1);
}

if (allChats.length === 0) {
	console.info("No chats found in database");
	process.exit(0);
}

console.info(
	`Chats in database before cleanup: ${allChats.length}\n` +
		`Group chats: ${allChats.filter((chat) => chat.id < 0).length}\n` +
		`Private chats: ${allChats.filter((chat) => chat.id > 0).length}\n`,
);

console.info("Deleting chats...");
for (const chat of allChats) {
	// private chats
	if (chat.id > 0) {
		// this function delete chat automatically if it's not accessible
		await checkChatAccessibility(chat.id, false);
		continue;
	}

	// group chats
	try {
		await bot.api.leaveChat(chat.id);
	} catch (err) {
		// @ts-ignore
		console.warn(`Failed to leave group chat ${chat.id}: `, err.message);
	}
	await deleteChat(chat.id);
}

const chatsAfterCleanup = await getAllChats();
if (!chatsAfterCleanup) {
	console.error("Failed to get chats after cleanup");
	process.exit(1);
}

console.info(
	`\nChats in database after cleanup: ${chatsAfterCleanup.length}\n` +
		`Group chats: ${chatsAfterCleanup.filter((chat) => chat.id < 0).length}\n` +
		`Private chats: ${chatsAfterCleanup.filter((chat) => chat.id > 0).length}\n`,
);

process.exit(0);

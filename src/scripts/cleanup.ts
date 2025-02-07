import { getAllChats } from "~/services/chat.service";
import { checkChatAccessibility } from "~/shared/check-chat-accessibility";

async function processBatch<T>(items: T[], batchSize: number, processItem: (item: T) => Promise<void>) {
	for (let i = 0; i < items.length; i += batchSize) {
		const batch = items.slice(i, i + batchSize);
		console.log(`Processing batch ${i / batchSize + 1}...`);
		await Promise.all(batch.map(processItem));
	}
}

async function main() {
	const allChats = await getAllChats();
	if (!allChats) {
		console.error("Failed to get chats from database");
		process.exit(1);
	}

	if (allChats.length === 0) {
		console.info("No chats found in database");
		process.exit(0);
	}

	console.info(`Chats in database before cleanup: ${allChats.length}\n`);

	console.info(`Processing ${allChats.length} chats...`);
	await processBatch(allChats, 10, async (chat) => {
		try {
			await checkChatAccessibility(chat.id, false);
		} catch (err) {
			console.warn(`Failed to check accessibility for chat ${chat.id}:`, err);
		}
	});

	const chatsAfterCleanup = await getAllChats();
	if (!chatsAfterCleanup) {
		console.error("Failed to get chats after cleanup");
		process.exit(1);
	}

	console.info(`\nChats in database after cleanup: ${chatsAfterCleanup.length}\n`);

	process.exit(0);
}

main().catch(console.error);

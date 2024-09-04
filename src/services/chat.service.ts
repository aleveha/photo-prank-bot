import { eq, sql } from "drizzle-orm";
import { database, schema } from "~/configs/database";

const deleteChatQuery = database
	.delete(schema.chat)
	.where(eq(schema.chat.id, sql.placeholder("id")))
	.prepare("deleteChatQuery");

export async function deleteChat(id: number) {
	try {
		await deleteChatQuery.execute({ id });
	} catch (err) {
		console.error("Failed to delete chat:\n", err);
	}
}

const getAllChatsQuery = database.select().from(schema.chat).prepare("getAllChatsQuery");

export async function getAllChats() {
	try {
		return await getAllChatsQuery.execute();
	} catch (err) {
		console.error("Failed to get all chats:\n", err);
		return null;
	}
}

const addChatQuery = database
	.insert(schema.chat)
	.values({ id: sql.placeholder("chatId") })
	.onConflictDoNothing()
	.prepare("insertChat");

export async function addChat(chatId: number) {
	try {
		await addChatQuery.execute({ chatId: chatId });

		return true;
	} catch (error) {
		console.error("Error inserting chat:", error);

		return false;
	}
}

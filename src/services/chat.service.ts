import { eq, sql } from "drizzle-orm";
import { type InsertChat, database, schema } from "~/configs/database";

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
	.prepare("insertChatQuery");

export async function addChat(chatId: number) {
	try {
		await addChatQuery.execute({ chatId: chatId });

		return true;
	} catch (error) {
		console.error("Error inserting chat:", error);

		return false;
	}
}

const getChatQuery = database.query.chat
	.findFirst({ where: eq(schema.chat.id, sql.placeholder("chatId")) })
	.prepare("getChatQuery");

export async function getChat(chatId: number) {
	try {
		return await getChatQuery.execute({ chatId });
	} catch (error) {
		console.error("Error getting chat:", error);

		return null;
	}
}

type UpdateChatData = Partial<Omit<InsertChat, "id">>;

export async function updateChat(id: number, data: UpdateChatData) {
	try {
		const results = await database.update(schema.chat).set(data).where(eq(schema.chat.id, id)).returning();
		if (!results.length) {
			return undefined;
		}

		return results[0];
	} catch (error) {
		console.error("Error updating chat:", error);

		return null;
	}
}

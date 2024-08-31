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

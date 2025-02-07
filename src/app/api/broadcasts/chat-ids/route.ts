import { getAllChats } from "~/services/chat.service";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const preferredRegion = ["fra1", "cdg1", "lhr1"];

export async function GET() {
	const allChats = await getAllChats();
	if (!allChats) {
		return new Response("Failed to get chats from database", { status: 500 });
	}

	if (allChats.length === 0) {
		return new Response("No chats found in database", { status: 404 });
	}

	const chatIds = allChats.map((chat) => chat.id);
	return new Response(chatIds.join("\n"), { status: 200 });
}

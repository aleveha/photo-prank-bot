import { webhookCallback } from "grammy";
import type { NextRequest } from "next/server";
import { bot } from "~/bot";

export async function POST(req: NextRequest) {
	try {
		await webhookCallback(bot, "std/http")(req);
	} catch (err) {
		console.error("An error occurred in the bot:\n", err);
	}

	return new Response("Success!", { status: 200 });
}

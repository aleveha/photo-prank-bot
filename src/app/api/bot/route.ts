export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const preferredRegion = ["fra1", "cdg1", "lhr1"];

import { webhookCallback } from "grammy";
import { bot } from "~/bot";

export async function POST(req: Request) {
	try {
		await webhookCallback(bot, "std/http")(req);
	} catch (err) {
		console.error("An error occurred in the bot:\n", err);
	}

	return new Response("Success!", { status: 200 });
}

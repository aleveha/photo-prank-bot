export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const preferredRegion = ["fra1", "cdg1", "lhr1"];

import { webhookCallback } from "grammy";
import type { NextApiRequest, NextApiResponse } from "next";
import { bot } from "~/bot";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	webhookCallback(bot, "next-js")(req, res).catch((err) => {
		console.error("An error occurred in the bot:\n", err);
	});

	return res.status(200).json({ message: "Success!" });
}

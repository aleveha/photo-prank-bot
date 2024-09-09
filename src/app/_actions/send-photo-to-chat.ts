"use server";

import { InlineKeyboard, InputFile } from "grammy";
import { getTranslations } from "next-intl/server";
import { bot } from "~/bot";

interface SendPhotoToChat {
	photo: string;
	chatId: number;
	ip: string;
	device: string;
}

export async function sendPhotoToChat({ photo, chatId, ip, device }: SendPhotoToChat) {
	const t = await getTranslations("bot.photo-message");

	const blob = await fetch(photo).then((res) => res.blob());
	try {
		await bot.api.sendPhoto(chatId, new InputFile(Buffer.from(await blob.arrayBuffer())), {
			caption: `IP: ${ip}\n` + `${t("device")}: ${device}\n\n`,
			reply_markup: new InlineKeyboard().text(t("report-button"), "report"),
		});
	} catch (err) {
		console.error(`Failed to send photo to chat ${chatId}:\n`, err);
	}
}

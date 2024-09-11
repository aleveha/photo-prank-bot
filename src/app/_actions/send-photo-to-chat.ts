"use server";

import { InlineKeyboard, InputFile } from "grammy";
import { getTranslations } from "next-intl/server";
import { bot } from "~/bot";
import { REPORT_REASONS } from "~/bot/handlers/callbacks/report";

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
			reply_markup: new InlineKeyboard()
				.text(t("report-violation-button"), `report:${REPORT_REASONS.violation}`)
				.row()
				.text(t("report-spam-button"), `report:${REPORT_REASONS.spam}`)
				.row(),
		});
	} catch (err) {
		console.error(`Failed to send photo to chat ${chatId}:\n`, err);
	}
}

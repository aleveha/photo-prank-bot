import { envs } from "~/configs/envs";
import { SOCIAL_MEDIA } from "~/shared/constants/social-media";

export function generateLinks(chatId: number) {
	const chatIdString = chatId.toString();
	const urlChatId = chatIdString.startsWith("-") ? chatIdString.slice(1) : chatIdString;
	const link = `${envs.APP_URL}/video/${urlChatId}`;

	return Object.entries(SOCIAL_MEDIA)
		.map(([_, value]) => `<b><u>${value.name}</u></b>:\n` + `https://${value.domain}.${link}`)
		.join("\n\n");
}

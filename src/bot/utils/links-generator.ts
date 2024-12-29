import { envs } from "~/configs/envs";
import { SOCIAL_MEDIA } from "~/shared/constants/social-media";

export function generateLinks(chatId: number) {
	const link = `${envs.APP_URL}/video/${chatId}`;

	return Object.entries(SOCIAL_MEDIA)
		.map(([_, value]) => `<b><u>${value.name}</u></b>:\n` + `https://${value.domain}.${link}`)
		.join("\n\n");
}

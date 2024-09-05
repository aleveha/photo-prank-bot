import { bot } from "~/bot";
import { envs } from "~/configs/envs";

const VALID_STATUSES = ["creator", "member", "administrator"];

export async function subscribedToChannel(channelId: string, userId: number) {
	if (envs.isProduction) {
		try {
			const { status } = await bot.api.getChatMember(
				channelId.startsWith("@") ? channelId : `@${channelId}`,
				userId,
			);

			return VALID_STATUSES.includes(status);
		} catch (_) {
			return false;
		}
	}

	return true;
}

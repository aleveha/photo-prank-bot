import { COMMANDS, bot } from "~/configs/bot";
import { envs } from "~/configs/envs";

const WEBHOOK_URL = `https://${envs.APP_URL}/api/bot`;

export async function register() {
	try {
		const { url } = await bot.api.getWebhookInfo();
		if (url === WEBHOOK_URL) return;
		await bot.api.setWebhook(WEBHOOK_URL, { drop_pending_updates: true });
		await bot.api.setMyCommands(COMMANDS);
	} catch (err) {
		console.error(err);
	}
}

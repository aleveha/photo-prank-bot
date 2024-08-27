import { bot } from "~/configs/bot";
import { envs } from "~/configs/envs";

export async function register() {
	await bot.api.setWebhook(envs.APP_URL + "/api/bot", { drop_pending_updates: true });
}

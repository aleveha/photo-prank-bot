import { bot } from "~/bot";
import { COMMANDS } from "~/bot/handlers/commands";
import { envs } from "~/configs/envs";

export async function startup() {
	console.log("Loaded environment variables:", envs);

	try {
		await bot.api.setWebhook(`https://${envs.APP_URL}/api/bot`, {
			allowed_updates: ["my_chat_member", "message"],
			drop_pending_updates: true,
		});
	} catch (err) {
		console.error("Failed to set webhook:", err);
	}

	try {
		await bot.api.setMyCommands(COMMANDS);
	} catch (err) {
		console.error("Failed to set commands:", err);
	}

	if (!envs.isProduction) {
		return;
	}

	try {
		const version = envs.PULL_REQUEST_ID ? ` #${envs.PULL_REQUEST_ID}` : "";
		await bot.api.sendMessage(envs.ADMIN_CHAT_ID, `Запущена новая версия${version}`);
	} catch (err) {
		console.error("Failed to send message:", err);
	}
}

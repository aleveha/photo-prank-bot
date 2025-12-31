import { bot } from "~/bot";
import { COMMANDS } from "~/bot/handlers/commands";
import { envs } from "~/configs/envs";

async function setWehbook() {
	try {
		await bot.api.setWebhook(`${envs.APP_URL}/api/bot`, {
			allowed_updates: ["my_chat_member", "message", "callback_query"],
			drop_pending_updates: true
		});
		console.info("Webhook set successfully");
	} catch (err) {
		console.error("Failed to set webhook:", err);
	}
}

async function setCommands() {
	try {
		await COMMANDS.setCommands(bot);
		console.info("Commands set successfully");
	} catch (err) {
		console.error("Failed to set commands:", err);
	}
}

async function notifyAdmin() {
	try {
		await bot.api.sendMessage(envs.ADMIN_CHAT_ID, "Запущена новая версия");
	} catch (err) {
		console.error("Failed to send message:", err);
	}
}

export async function register() {
	console.log("Loaded environment variables:", envs);

	await setCommands();
	await setWehbook();

	if (envs.isProduction) {
		await notifyAdmin();
	}
}

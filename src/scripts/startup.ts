import { bot } from "~/bot";
import { COMMANDS } from "~/bot/handlers/commands";
import { envs } from "~/configs/envs";

console.log("Loaded environment variables:", envs);

try {
	await bot.api.setWebhook(`https://${envs.APP_URL}/api/bot`, {
		allowed_updates: ["my_chat_member", "message", "callback_query"],
		drop_pending_updates: true,
	});
	console.info("Webhook set successfully");
} catch (err) {
	console.error("Failed to set webhook:", err);
}

try {
	await bot.api.setMyCommands(COMMANDS);
	console.info("Commands set successfully");
} catch (err) {
	console.error("Failed to set commands:", err);
}

if (envs.isProduction) {
	try {
		await bot.api.sendMessage(envs.ADMIN_CHAT_ID, "Запущена новая версия");
	} catch (err) {
		console.error("Failed to send message:", err);
	}
}

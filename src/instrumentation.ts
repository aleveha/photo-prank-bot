export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		const { bot } = await import("~/bot");
		const { COMMANDS } = await import("~/bot/handlers/commands");
		const { envs } = await import("~/configs/envs");

		const WEBHOOK_URL = `https://${envs.APP_URL}/api/bot`;
		try {
			const { url } = await bot.api.getWebhookInfo();
			if (url === WEBHOOK_URL) return;
			await bot.api.setWebhook(WEBHOOK_URL, { drop_pending_updates: true });
		} catch (err) {
			console.error("Failed to set webhook", err);
			return;
		}

		try {
			await bot.api.setMyCommands(COMMANDS);
		} catch (err) {
			console.error("Failed to set commands", err);
		}

		if (!envs.isProduction) {
			return;
		}

		try {
			await bot.api.sendMessage(envs.ADMIN_CHAT_ID, "Бот запущен");
		} catch (err) {
			console.error("Failed to send message", err);
		}
	}
}

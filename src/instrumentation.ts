export async function register() {
	if (process.env.NEXT_RUNTIME !== "nodejs") {
		return;
	}

	const { bot } = await import("~/bot");
	const { COMMANDS } = await import("~/bot/handlers/commands");
	const { envs } = await import("~/configs/envs");

	async function setWebhook() {
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

	console.log("Loaded environment variables:", envs);

	await setCommands();
	await setWebhook();
}

import { type CallbackQueryContext, InlineKeyboard } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";

export async function reportCallback(ctx: CallbackQueryContext<Context>) {
	const callbackData = typeof ctx.match === "string" ? ctx.match : ctx.match[0];

	if (!callbackData.includes(":")) {
		await ctx.editMessageCaption({
			caption: ctx.t("report-command.warning-message") + "\n\n" + ctx.msg?.caption,
			parse_mode: "HTML",
			reply_markup: new InlineKeyboard()
				.text(ctx.t("report-command.report-button"), "report:1")
				.row()
				.text(ctx.t("report-command.cancel-button"), "report:0")
				.row(),
		});

		return;
	}

	const originalMessage = ctx.msg?.caption?.split("\n\n")[2];
	const doReport = !!Number.parseInt(callbackData.split(":")[1]);

	if (!doReport) {
		await ctx.editMessageCaption({
			caption: originalMessage,
			parse_mode: "HTML",
			reply_markup: undefined,
		});

		return;
	}

	const reportMessage =
		`Report from ${ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name}\n` +
		`ID: ${ctx.from.id}\n\n` +
		`Original message:\n${originalMessage}`;

	const reportKeyboard = new InlineKeyboard().text("Warn", `warn:${ctx.from.id}`).text("Ban", `ban:${ctx.from.id}`);

	const { message_id: reportId } = await ctx.copyMessage(envs.REPORT_CHAT_ID, {
		caption: reportMessage,
		reply_markup: reportKeyboard,
	});
	await ctx.api.editMessageCaption(envs.REPORT_CHAT_ID, reportId, {
		caption: `#${reportId}\n\n${reportMessage}`,
		reply_markup: reportKeyboard,
	});

	await ctx.editMessageCaption({
		caption: ctx.t("report-command.success-message", { reportId }) + "\n\n" + originalMessage,
		parse_mode: "HTML",
		reply_markup: undefined,
	});
}

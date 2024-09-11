import { type CallbackQueryContext, InlineKeyboard } from "grammy";
import type { Context } from "~/bot/types";
import { envs } from "~/configs/envs";
import { REPORT_REASONS, REPORT_VALUES, type ReportReason, type ReportValue } from "./constants";

export async function reportCallback(ctx: CallbackQueryContext<Context>) {
	const callbackData = typeof ctx.match === "string" ? ctx.match : ctx.match[0];
	const params = callbackData.split(":");
	const originalMessageParts = ctx.msg?.caption?.split("\n\n");
	const originalMessage = originalMessageParts?.[originalMessageParts.length - 1];

	if (params.length === 1) {
		await ctx.editMessageCaption({
			caption: originalMessage,
			reply_markup: undefined,
		});

		return;
	}

	if (params.length === 2) {
		await ctx.editMessageCaption({
			caption: ctx.t("report-command.warning-message") + "\n\n" + ctx.msg?.caption,
			reply_markup: new InlineKeyboard()
				.text(ctx.t("report-command.report-button"), `${callbackData}:${REPORT_VALUES.do}`)
				.row()
				.text(ctx.t("report-command.cancel-button"), `${callbackData}:${REPORT_VALUES.cancel}`)
				.row(),
		});

		return;
	}

	const [, reason, doReport] = params as ["report", ReportReason, ReportValue];
	if (doReport === "cancel") {
		await ctx.editMessageCaption({
			caption: originalMessage,
			reply_markup: new InlineKeyboard()
				.text(ctx.t("report-command.report-violation-button"), `report:${REPORT_REASONS.violation}`)
				.row()
				.text(ctx.t("report-command.report-spam-button"), `report:${REPORT_REASONS.spam}`)
				.row(),
		});

		return;
	}

	const reportMessage =
		`Report from ${ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name}\n` +
		`ID: ${ctx.from.id}\n` +
		`Reason: <b>${reason}</b>\n\n` +
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
		reply_markup: undefined,
	});
}

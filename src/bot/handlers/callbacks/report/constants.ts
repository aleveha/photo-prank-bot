export const REPORT_REASONS = {
	violation: "violation",
	spam: "spam",
} as const;
export type ReportReason = (typeof REPORT_REASONS)[keyof typeof REPORT_REASONS];

export const REPORT_VALUES = {
	do: "do",
	cancel: "cancel",
} as const;
export type ReportValue = (typeof REPORT_VALUES)[keyof typeof REPORT_VALUES];

export const REPORT_CALLBACK_QUERY_TRIGGER = new RegExp(
	`report:(${Object.values(REPORT_REASONS).join("|")})(:(${Object.values(REPORT_VALUES).join("|")}))?`,
);

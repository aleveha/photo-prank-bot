import path from "node:path";
import { I18n } from "@grammyjs/i18n";
import type { Context } from "~/bot/types";
import { DEFAULT_LOCALE } from "~/configs/i18n";

export const i18n = new I18n<Context>({
	defaultLocale: DEFAULT_LOCALE,
	directory: path.join(process.cwd(), "/src/bot/locales"),
});

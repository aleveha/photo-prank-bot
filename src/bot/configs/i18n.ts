import path from "node:path";
import { I18n } from "@grammyjs/i18n";
import type { Context } from "~/bot/types";

export const i18n = new I18n<Context>({
	defaultLocale: "en",
	directory: path.join(process.cwd(), "/src/bot/locales"),
});

import { I18n } from "@grammyjs/i18n";
import type { Context } from "~/bot/types";

export const i18n = new I18n<Context>({
	defaultLocale: "en",
	directory: "src/locales",
});

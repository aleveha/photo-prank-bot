import path from "node:path";
import { I18n } from "@grammyjs/i18n";
import type { Context } from "~/bot/types";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "~/configs/i18n";
import { getChat, updateChat } from "~/services/chat.service";

function isSupportedLocale(locale: string): locale is Locale {
	return Array.from<string>(LOCALES).includes(locale);
}

export const i18n = new I18n<Context>({
	defaultLocale: DEFAULT_LOCALE,
	directory: path.join(process.cwd(), "/src/bot/locales"),
	localeNegotiator: async (ctx) => {
		if (!ctx.from) {
			return DEFAULT_LOCALE;
		}

		const chat = await getChat(ctx.from.id);
		if (chat?.language) {
			return chat.language;
		}

		if (ctx.from.language_code) {
			if (!isSupportedLocale(ctx.from.language_code)) {
				console.warn(`[i18n] Unsupported language code: ${ctx.from.language_code}`);
				return DEFAULT_LOCALE;
			}

			await updateChat(ctx.from.id, { language: ctx.from.language_code });

			return ctx.from.language_code;
		}

		return DEFAULT_LOCALE;
	},
});

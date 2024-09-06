import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "../_actions/user-locale";

export const LOCALES = ["en", "ru"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export type Locale = (typeof LOCALES)[number];

export default getRequestConfig(async () => {
	const locale = await getUserLocale();

	return {
		locale,
		messages: (await import(`../_locales/${locale}.json`)).default,
		defaultTranslationValues: {
			b: (content) => <span className="font-bold">{content}</span>,
			u: (content) => <span className="underline underline-offset-4">{content}</span>,
		},
	};
});

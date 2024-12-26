"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, type Locale } from "~/configs/i18n";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
	const _cookies = await cookies();
	return _cookies.get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: Locale) {
	const _cookies = await cookies();
	_cookies.set(COOKIE_NAME, locale);
}

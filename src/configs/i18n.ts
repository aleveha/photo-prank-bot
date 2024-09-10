export const LOCALES = ["en", "ru"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export type Locale = (typeof LOCALES)[number];

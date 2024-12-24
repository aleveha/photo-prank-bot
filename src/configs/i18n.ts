export const LOCALES = ["en", "ru"] as const;
export const DEFAULT_LOCALE: Locale = "ru";

export type Locale = (typeof LOCALES)[number];

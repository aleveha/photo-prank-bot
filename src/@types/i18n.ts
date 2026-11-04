import type en from "../app/_locales/en.json";

declare module "next-intl" {
	interface AppConfig {
		Messages: typeof en;
	}
}

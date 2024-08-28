import { object, optional, parse, string } from "valibot";

const envsSchema = object({
	TELEGRAM_TOKEN: string(),
	VERCEL_PROJECT_PRODUCTION_URL: string(),
	PORT: optional(string(), "3000"),
});

const _envs = parse(envsSchema, process.env);

export const envs = {
	..._envs,
	APP_URL: _envs.VERCEL_PROJECT_PRODUCTION_URL,
} as const;

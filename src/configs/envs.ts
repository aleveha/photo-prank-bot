import { cleanEnv, port, str } from "envalid";

const _envs = cleanEnv(process.env, {
	TELEGRAM_TOKEN: str(),
	VERCEL_PROJECT_PRODUCTION_URL: str(),
	PORT: port({ default: 3000 }),
});

export const envs = {
	..._envs,
	APP_URL: _envs.VERCEL_PROJECT_PRODUCTION_URL,
	isDevelopment: _envs.isDevelopment,
	isProduction: _envs.isProduction,
} as const;

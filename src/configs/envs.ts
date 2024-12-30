import { cleanEnv, num, str } from "envalid";

const _envs = cleanEnv(process.env, {
	ADMIN_CHAT_ID: num({ default: -1002167443042 }),
	CHANNEL_ID: str({ default: "make_them_smile_channel" }),
	DATABASE_URL: str(),
	FLYER_API_KEY: str(),
	NEXT_PUBLIC_BOT_NAME: str({ default: "make_them_smile_bot" }),
	REPORT_CHAT_ID: num({ default: -1002335737370 }),
	TELEGRAM_TOKEN: str(),
	VERCEL_PROJECT_PRODUCTION_URL: str()
});

export const envs = {
	..._envs,
	APP_URL: _envs.VERCEL_PROJECT_PRODUCTION_URL,
	isDevelopment: _envs.isDevelopment,
	isProduction: _envs.isProduction
} as const;

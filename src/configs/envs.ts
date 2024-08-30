import { cleanEnv, num, port, str } from "envalid";

const _envs = cleanEnv(process.env, {
	ADMIN_CHAT_ID: num({ default: -723672593 }),
	TELEGRAM_TOKEN: str(),
	VERCEL_PROJECT_PRODUCTION_URL: str({ default: "mysubdomain.loca.lt" }),
	VERCEL_GIT_PULL_REQUEST_ID: str({ default: undefined }),
	PORT: port({ default: 3000 }),
	DATABASE_URL: str(),
});

export const envs = {
	..._envs,
	APP_URL: _envs.VERCEL_PROJECT_PRODUCTION_URL,
	PULL_REQUEST_ID: _envs.VERCEL_GIT_PULL_REQUEST_ID,
	isDevelopment: _envs.isDevelopment,
	isProduction: _envs.isProduction,
} as const;

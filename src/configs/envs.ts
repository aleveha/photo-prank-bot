import { url, object, parse, pipe, string } from "valibot";

const envsSchema = object({
	TELEGRAM_TOKEN: string(),
	APP_URL: pipe(string(), url()),
	PORT: string(),
});

export const envs = parse(envsSchema, process.env);

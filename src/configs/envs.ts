import { url, object, optional, parse, pipe, string } from "valibot";

const envsSchema = object({
	TELEGRAM_TOKEN: string(),
	APP_URL: pipe(string(), url()),
	PORT: optional(string(), "3000"),
});

export const envs = parse(envsSchema, process.env);

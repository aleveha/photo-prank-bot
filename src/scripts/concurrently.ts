import { $ } from "bun";
import { envs } from "~/configs/envs";

const DOMAIN = envs.APP_URL.split(".")[0].trim();

if (!DOMAIN) {
	throw new Error("Invalid APP_URL environment variable.");
}

await Promise.all([$`bunx next dev -p ${envs.PORT}`, $`bunx lt -s ${DOMAIN} -p ${envs.PORT}`]);

import { defineConfig } from "drizzle-kit";
import { envs } from "~/configs/envs";

export default defineConfig({
	schema: "./src/configs/database/schema.ts",
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: envs.DATABASE_URL,
	},
	introspect: {
		casing: "camel",
	},
});

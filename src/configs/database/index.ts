import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { envs } from "~/configs/envs";
import { schema } from "./schema";

const queryClient = postgres(envs.DATABASE_URL, { max: 10 });

const database = drizzle(queryClient, { schema });

export { database, schema };

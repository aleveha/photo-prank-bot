import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { envs } from "~/configs/envs";
import { schema } from "./schema";

export type { InsertChat } from "./schema";

// infer: true keeps v3 JS parameter typing (Dates, bools, bigints, arrays)
const queryClient = postgres(envs.DATABASE_URL, { max: 10, infer: true });

const database = drizzle(queryClient, { schema });

export { database, schema };

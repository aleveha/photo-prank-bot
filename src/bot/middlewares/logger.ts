import type { Context, NextFunction } from "grammy";

export async function loggerMiddleware<C extends Context>(ctx: C, next: NextFunction) {
	console.info(JSON.stringify(ctx, null, 2));
	await next();
}

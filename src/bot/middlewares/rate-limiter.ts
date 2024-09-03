import { limit } from "@grammyjs/ratelimiter";

export const rateLimiter = limit({
	limit: 1,
	onLimitExceeded: (ctx) => console.warn("Rate limit exceeded", ctx.from?.id),
	timeFrame: 3000,
});

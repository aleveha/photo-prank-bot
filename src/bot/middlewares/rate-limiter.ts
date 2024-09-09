import type { limit } from "@grammyjs/ratelimiter";

type Config = Parameters<typeof limit>[0];

export const DEFAULT_RATE_LIMITER_CONFIG = {
	timeFrame: 2_000,
	onLimitExceeded: (ctx) => console.warn("Rate limit exceeded", ctx.from?.id),
} satisfies Config;

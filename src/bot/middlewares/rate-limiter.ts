import { limit } from "@grammyjs/ratelimiter";

export const rateLimiter = limit({ onLimitExceeded: (ctx) => console.warn("Rate limit exceeded", ctx.from?.id) });

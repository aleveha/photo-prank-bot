# AGENTS.md

Telegram photo-prank bot + Next.js Mini App. Prefer matching nearby code over inventing new patterns.

## Stack

- **Runtime / package manager:** Bun (`bun.lock`). Prefer `bun` over npm/yarn/pnpm.
- **App:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind 3, shadcn/ui.
- **Bot:** grammy + Fluent (`.ftl`) locales.
- **Web i18n:** next-intl + JSON in `src/app/_locales/`.
- **DB:** PostgreSQL + Drizzle ORM.
- **Lint/format:** Biome (tabs, line width 120, **no trailing commas**).
- **Env:** `envalid` in `src/configs/envs.ts`. Path alias: `~/*` → `src/*` (not `@/`).

## Commands

```bash
bun install
bun run dev
bun run build
bun run typecheck
bun run format
bun run db:g <migration-name>   # generate
bun run db:m                    # migrate
bun run db:ui
```

## Layout

| Path | Purpose |
| --- | --- |
| `src/app/` | Next UI, `_actions`, `_components`, API routes |
| `src/bot/` | Grammy bot (handlers, middlewares, Fluent locales) |
| `src/configs/` | Shared envs + DB |
| `src/services/` | Shared DB services |
| `src/shared/` | Cross-cutting helpers |
| `src/proxy.ts` | Next 16 request proxy (not `middleware.ts`) |
| `src/instrumentation.ts` | Sets bot commands + webhook on boot |

Underscore folders under `app/` (`_actions`, `_components`, …) are private — not routes.

## Hard rules

1. Keep changes minimal; follow existing file style.
2. Two i18n systems: bot strings → `src/bot/locales/*.ftl`; web strings → `src/app/_locales/*.json`. Do not mix.
3. Do not recreate `middleware.ts` — use `src/proxy.ts`.
4. Do not commit secrets or `.env.*`.
5. After non-trivial TS edits, run `bun run typecheck`. Format with `bun run format` when touching many files.
6. Prefer referencing canonical files over new abstractions (see `.cursor/rules/`).

## Cursor rules

Scoped guidance lives in `.cursor/rules/*.mdc` (TypeScript, Next/React, Tailwind/UI, bot, database). Keep those short; update them when agents repeat a mistake.

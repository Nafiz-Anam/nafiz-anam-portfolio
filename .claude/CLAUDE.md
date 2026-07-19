# personal-portfolio — project rules

Monorepo: public site, CMS admin, API. pnpm workspaces + Turborepo.

## Stack (do not deviate without asking)

- Package manager: **pnpm** only. Never suggest npm/yarn.
- Monorepo orchestration: **Turborepo**.
- `apps/web`: Next.js (App Router) + Tailwind + shadcn/ui + Zod + Axios — public site.
- `apps/cms`: Next.js (App Router) + Tailwind + shadcn/ui + Zod + Axios — admin panel, separate app/deploy.
- `apps/api`: Express + Node + Prisma + Zod — REST backend, single source of truth for data access.
- `packages/db`: Prisma schema + generated client. Only `apps/api` imports it.
- `packages/types`: shared TS types / Zod schemas used by web, cms, and api. Never duplicate a type across apps — import from here.
- `packages/ui`: shared shadcn/ui components, used by web + cms.
- `packages/config`: shared tsconfig/eslint/tailwind config.
- DB: Postgres. Deploy: Docker Compose on a single VPS.
- Auth: self-rolled JWT issued by `apps/api`, set as httpOnly cookie, verified by Next middleware in web/cms.

## Hard rules

1. **Never hand-edit the generated Prisma client** (`packages/db/generated/**`). It's regenerated from `schema.prisma`.
2. **Schema changes always go through `prisma migrate dev --name <desc>`** — never edit the DB directly, never skip a migration file.
3. **Every Express route validates its input with Zod** before it touches Prisma. No unvalidated `req.body`/`req.query` reaches the DB layer.
4. **Shared types live in `packages/types` only.** If web, cms, and api all need a shape, it belongs there — not copy-pasted.
5. **Never log JWTs, cookies, or `JWT_SECRET`.**
6. **No `docker compose down -v` and no `prisma migrate reset` without explicit user confirmation** — both destroy data.
7. **No `prisma migrate deploy` against a prod-looking `DATABASE_URL`** without explicit user confirmation.
8. Commits follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, ...).

## Conventions

- API routes live in `apps/api/src/routes/<resource>.ts`, registered in `apps/api/src/routes/index.ts`.
- Next pages follow App Router conventions (`app/<route>/page.tsx`); shared layout in `app/layout.tsx`.
- Environment variables are documented in root `.env.example` — add new vars there when you add them anywhere.

# personal-portfolio

Monorepo: public site + CMS admin + API. pnpm workspaces + Turborepo.

## Stack

- `apps/web` — Next.js public site (Tailwind, shadcn/ui-style components, Zod, Axios)
- `apps/cms` — Next.js admin panel (same stack, separate app/deploy)
- `apps/api` — Express + Prisma REST backend
- `packages/db` — Prisma schema + client
- `packages/types` — shared Zod schemas / TS types
- `packages/ui` — shared UI components
- `packages/config` — shared tsconfig/eslint/tailwind config
- Postgres, Docker Compose for local + VPS deploy

See `.claude/CLAUDE.md` for project conventions and AI operating rules.

## Local dev

```bash
cp .env.example .env      # fill in real values
pnpm install

# start postgres only (or run full stack via docker, see below)
docker compose -f docker/docker-compose.yml up -d postgres

pnpm --filter @portfolio/db exec prisma migrate dev --name init
pnpm dev   # runs web (:3000), cms (:3001), api (:4000) in parallel via turbo
```

## Full stack via Docker

```bash
docker compose -f docker/docker-compose.yml up --build
```

## Production (VPS)

```bash
docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d --build
```

Put nginx/caddy in front of `web` (3000), `cms` (3001), `api` (4000) on the host for TLS + routing.
# nafiz-anam-portfolio

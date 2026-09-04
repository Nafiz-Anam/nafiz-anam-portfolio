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
- Auth: self-rolled JWT access (7d) + refresh (30d) tokens, both httpOnly cookies. Refresh tokens are stored **hashed** in `RefreshToken` (DB) and **rotated on every use** — see `apps/api/src/routes/auth.ts`.
- API clients: `apps/web/lib/api.ts` and `apps/cms/lib/api.ts` are Axios instances with response interceptors that normalize every error into `ApiErrorShape` (`packages/types`). The cms client additionally retries once on `ACCESS_TOKEN_EXPIRED` via `/api/auth/refresh` before giving up and redirecting to `/login`.
- Animations: Framer Motion + GSAP, `apps/web` only (`apps/web/components/FadeIn.tsx`, `apps/web/lib/gsap.ts`). Not installed in cms.
- Image uploads: local disk (`apps/api/uploads/`, Docker volume `api_uploads`), served at `/uploads/*`, behind `requireAuth`. `apps/cms/components/ImageUpload.tsx` is the client-side upload widget.
- Rich text: Tiptap, cms-only (`apps/cms/components/RichTextEditor.tsx`). Content is stored as HTML in `BlogPost.contentHtml` — server is the trust boundary, sanitize/escape on render in `apps/web` before this ships to production.

## Hard rules

1. **Never hand-edit the generated Prisma client** (`packages/db/generated/**`). It's regenerated from `schema.prisma`.
2. **Schema changes always go through `prisma migrate dev --name <desc>`** — never edit the DB directly, never skip a migration file.
3. **Every Express route validates its input with Zod** before it touches Prisma. No unvalidated `req.body`/`req.query` reaches the DB layer.
4. **Shared types live in `packages/types` only.** If web, cms, and api all need a shape, it belongs there — not copy-pasted.
5. **Never log JWTs, cookies, or `JWT_SECRET`.**
6. **No `docker compose down -v` and no `prisma migrate reset` without explicit user confirmation** — both destroy data.
7. **No `prisma migrate deploy` against a prod-looking `DATABASE_URL`** without explicit user confirmation.
8. Commits follow **Conventional Commits** (`feat:`, `fix:`, `chore:`, ...).
9. **Never reuse a revoked/rotated refresh token.** Current implementation revokes-on-use but does not yet detect reuse-of-a-revoked-token as a breach signal (which should revoke the whole token family) — flag this as a known gap, don't silently "fix" it as part of an unrelated change.
10. **Uploads**: enforce the mimetype allow-list and size limit already in `apps/api/src/routes/uploads.ts` — don't loosen either without asking.

## Reports & deliverables

- **No Artifacts.** Reports, implementation summaries, plans-as-docs — write them as `.md` files in the repo (e.g. `docs/`), not as published Artifacts.

## Conventions

- API routes live in `apps/api/src/routes/<resource>.ts`, registered in `apps/api/src/routes/index.ts`.
- Next pages follow App Router conventions (`app/<route>/page.tsx`); shared layout in `app/layout.tsx`.
- Environment variables are documented in root `.env.example` — add new vars there when you add them anywhere.

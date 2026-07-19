---
name: new-page
description: Scaffold a new page in apps/web or apps/cms following App Router conventions. Use when the user asks to add a new route/page to the site or admin panel.
---

Given a target app (web or cms) and a route path (e.g. "/projects/[slug]"):

1. Create `apps/<app>/app/<route>/page.tsx` as a Server Component by default.
2. If it needs client interactivity, mark only the interactive leaf component `"use client"` — not the whole page.
3. Data fetching from the API goes through an Axios client (see `apps/<app>/lib/api.ts`), typed with the matching DTO from `packages/types`.
4. Form inputs validate with Zod (`packages/types` schema, or local if page-specific) before submit.
5. Reuse components from `packages/ui` before writing a new one — check there first.
6. Wire up any needed layout/nav entry consistent with existing pages in the same app.

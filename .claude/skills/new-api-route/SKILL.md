---
name: new-api-route
description: Scaffold a new Express resource (route + Zod schema + Prisma query) in apps/api. Use when the user asks to add a new API endpoint/resource.
---

Given a resource name (e.g. "projects"):

1. Check `packages/db/schema.prisma` for a matching model. If missing, ask whether to add one (don't invent schema silently).
2. Create `apps/api/src/routes/<resource>.ts`:
   - Zod schema(s) for create/update payloads.
   - Handlers validate with Zod first, return 400 with `error.flatten()` on failure.
   - CRUD handlers call the Prisma client from `packages/db`.
3. Register the router in `apps/api/src/routes/index.ts` under `/api/<resource>`.
4. If web or cms will consume this resource, add the response DTO type to `packages/types` and import it — don't redefine it client-side.
5. Report the new endpoint paths and expected request/response shape back to the user.

---
name: db-migration
description: Checklist-driven workflow for changing the Prisma schema safely. Use whenever schema.prisma needs a new model, field, relation, or index.
---

1. Edit `packages/db/schema.prisma`.
2. Run `pnpm --filter db exec prisma migrate dev --name <short-description>` — never skip naming the migration.
3. Read the generated SQL in `packages/db/migrations/<timestamp>_<name>/migration.sql` and confirm it matches intent (no unexpected drops/casts).
4. If the shape is consumed outside `apps/api`, update the corresponding type/schema in `packages/types`.
5. Run `pnpm --filter api typecheck` (and web/cms if they consume the changed type) to catch breakage.
6. Never run `prisma migrate deploy` or `prisma migrate reset` as part of this flow — those are explicit, human-confirmed, separate actions (see `.Codex/agents/prisma-migrator.md`).

FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/db/package.json packages/db/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --frozen-lockfile --filter @portfolio/api...

FROM base AS build
COPY --from=deps /repo /repo
COPY packages/db packages/db
COPY packages/types packages/types
COPY packages/config packages/config
COPY apps/api apps/api
RUN pnpm --filter @portfolio/db exec prisma generate
RUN pnpm --filter @portfolio/api build

FROM node:20-alpine AS runner
RUN corepack enable
WORKDIR /repo
ENV NODE_ENV=production
COPY --from=build /repo /repo
EXPOSE 4000
# Run migrations then start — safe to run deploy on every boot (idempotent)
CMD ["sh", "-c", "cd packages/db && npx prisma migrate deploy && cd /repo && node apps/api/dist/index.js"]

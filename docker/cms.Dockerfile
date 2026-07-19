FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/cms/package.json apps/cms/package.json
RUN pnpm install --frozen-lockfile --filter @portfolio/cms...

FROM base AS build
COPY --from=deps /repo /repo
COPY packages/ui packages/ui
COPY packages/types packages/types
COPY packages/config packages/config
COPY apps/cms apps/cms
RUN pnpm --filter @portfolio/cms build

FROM node:20-alpine AS runner
RUN corepack enable
WORKDIR /repo
ENV NODE_ENV=production
COPY --from=build /repo /repo
EXPOSE 3001
CMD ["pnpm", "--filter", "@portfolio/cms", "start"]

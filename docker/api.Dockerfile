FROM node:20-alpine AS builder
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/db/package.json packages/db/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --frozen-lockfile --filter @portfolio/api...

COPY packages/db packages/db
COPY packages/types packages/types
COPY packages/config packages/config
COPY apps/api apps/api
RUN pnpm --filter @portfolio/db exec prisma generate
RUN pnpm --filter @portfolio/api build

FROM node:20-alpine AS runner
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo
ENV NODE_ENV=production
COPY --from=builder /repo/node_modules node_modules
COPY --from=builder /repo/packages packages
COPY --from=builder /repo/apps/api/dist apps/api/dist
COPY --from=builder /repo/apps/api/package.json apps/api/package.json
EXPOSE 4000
CMD ["sh", "-c", "cd /repo/packages/db && node_modules/.bin/prisma migrate deploy && cd /repo && node apps/api/dist/index.js"]

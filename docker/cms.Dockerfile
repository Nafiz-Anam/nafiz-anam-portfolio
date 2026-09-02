FROM node:20-alpine AS builder
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/cms/package.json apps/cms/package.json
RUN pnpm install --frozen-lockfile --shamefully-hoist --store-dir /repo/.pnpm-store --filter @portfolio/cms...

COPY packages/ui packages/ui
COPY packages/types packages/types
COPY packages/config packages/config
COPY apps/cms apps/cms
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL_CMS
ENV NEXT_PUBLIC_API_URL_CMS=$NEXT_PUBLIC_API_URL_CMS
RUN cd /repo/apps/cms && /repo/node_modules/.bin/next build

FROM node:20-alpine AS runner
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /repo/node_modules node_modules
COPY --from=builder /repo/packages packages
COPY --from=builder /repo/apps/cms/.next apps/cms/.next
COPY --from=builder /repo/apps/cms/public apps/cms/public
COPY --from=builder /repo/apps/cms/package.json apps/cms/package.json
COPY --from=builder /repo/apps/cms/next.config.ts apps/cms/next.config.ts
COPY --from=builder /repo/apps/cms/next.config.mjs apps/cms/next.config.mjs
EXPOSE 3001
WORKDIR /repo/apps/cms
CMD ["/repo/node_modules/.bin/next", "start", "-p", "3001"]

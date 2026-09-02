FROM node:20-alpine AS builder
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile --shamefully-hoist --store-dir /repo/.pnpm-store --filter @portfolio/web...

COPY packages/ui packages/ui
COPY packages/types packages/types
COPY packages/config packages/config
COPY apps/web apps/web
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_PREVIEW_SECRET
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_PREVIEW_SECRET=$NEXT_PUBLIC_PREVIEW_SECRET
RUN cd /repo/apps/web && /repo/node_modules/.bin/next build

FROM node:20-alpine AS runner
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /repo/node_modules node_modules
COPY --from=builder /repo/packages packages
COPY --from=builder /repo/apps/web/.next apps/web/.next
COPY --from=builder /repo/apps/web/public apps/web/public
COPY --from=builder /repo/apps/web/package.json apps/web/package.json
COPY --from=builder /repo/apps/web/next.config.mjs apps/web/next.config.mjs
EXPOSE 3000
WORKDIR /repo/apps/web
CMD ["/repo/node_modules/.bin/next", "start", "-p", "3000"]

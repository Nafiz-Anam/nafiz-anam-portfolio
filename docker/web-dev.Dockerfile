FROM node:20-alpine
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo

# Install deps layer (cached unless lock file changes)
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile --shamefully-hoist --store-dir /repo/.pnpm-store --filter @portfolio/web...

# Source is volume-mounted at runtime — no build step, no Google Fonts fetch
EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["sh", "-c", "/repo/node_modules/.bin/next dev -p 3000 --hostname 0.0.0.0"]

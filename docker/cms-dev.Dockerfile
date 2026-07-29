FROM node:20-alpine
RUN corepack enable && apk add --no-cache libc6-compat
WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/ui/package.json packages/ui/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/cms/package.json apps/cms/package.json
RUN pnpm install --frozen-lockfile --shamefully-hoist --store-dir /repo/.pnpm-store --filter @portfolio/cms...

EXPOSE 3001
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["sh", "-c", "/repo/node_modules/.bin/next dev -p 3001 --hostname 0.0.0.0"]

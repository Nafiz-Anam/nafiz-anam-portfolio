FROM node:20-alpine AS builder
RUN corepack enable && apk add --no-cache libc6-compat openssl
WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml* ./
COPY packages/db/package.json packages/db/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/config/package.json packages/config/package.json
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --frozen-lockfile --shamefully-hoist --store-dir /repo/.pnpm-store --filter @portfolio/api...

COPY packages/db packages/db
COPY packages/types packages/types
COPY packages/config packages/config
COPY apps/api apps/api
RUN cd /repo/packages/db && /repo/node_modules/.bin/prisma generate
RUN node -e " \
  const fs=require('fs'); \
  ['packages/db','packages/types'].forEach(pkg=>{ \
    const c=JSON.parse(fs.readFileSync(pkg+'/tsconfig.json')); \
    c.compilerOptions=Object.assign({},c.compilerOptions,{module:'CommonJS',moduleResolution:'Node'}); \
    fs.writeFileSync(pkg+'/tsconfig.cjs.json',JSON.stringify(c)); \
  });"
RUN cd /repo/packages/db && /repo/node_modules/.bin/tsc -p tsconfig.cjs.json && \
    node -e "const fs=require('fs'),p=JSON.parse(fs.readFileSync('package.json'));p.main='dist/index.js';p.types='dist/index.d.ts';fs.writeFileSync('package.json',JSON.stringify(p,null,2))"
RUN cd /repo/packages/types && /repo/node_modules/.bin/tsc -p tsconfig.cjs.json && \
    node -e "const fs=require('fs'),p=JSON.parse(fs.readFileSync('package.json'));p.main='dist/index.js';p.types='dist/index.d.ts';fs.writeFileSync('package.json',JSON.stringify(p,null,2))"
RUN cd /repo/apps/api && /repo/node_modules/.bin/tsc -p tsconfig.json

FROM node:20-alpine AS runner
RUN corepack enable && apk add --no-cache libc6-compat openssl
WORKDIR /repo
ENV NODE_ENV=production
COPY --from=builder /repo/node_modules node_modules
COPY --from=builder /repo/packages packages
COPY --from=builder /repo/apps/api/dist apps/api/dist
COPY --from=builder /repo/apps/api/package.json apps/api/package.json
EXPOSE 4000
CMD ["sh", "-c", "cd /repo/packages/db && /repo/node_modules/.bin/prisma migrate deploy && cd /repo && node apps/api/dist/index.js"]

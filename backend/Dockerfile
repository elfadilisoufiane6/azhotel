FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps  /app/node_modules ./node_modules
COPY --from=build /app/dist         ./dist
COPY package.json                   ./
# tsc compiles .ts only — SQL migrations must be shipped manually.
COPY src/database/migrations ./dist/database/migrations
RUN mkdir -p /app/uploads
EXPOSE 4000
CMD ["node", "dist/index.js"]

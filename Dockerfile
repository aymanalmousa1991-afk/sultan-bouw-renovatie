# ─── Stap 1: website bouwen ─────────────────────────────
FROM node:22-slim AS web
WORKDIR /app/web
COPY web/package*.json ./
RUN npm ci
COPY web/ ./
RUN npm run build

# ─── Stap 2: server ─────────────────────────────────────
FROM node:22-slim
ENV NODE_ENV=production
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ ./
COPY --from=web /app/web/dist /app/web/dist

EXPOSE 3000
CMD ["node", "index.js"]

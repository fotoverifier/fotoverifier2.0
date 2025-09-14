# === Base image ===
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat curl bind-tools
WORKDIR /app

# === Stage 1: Install dependencies ===
FROM base AS deps
COPY package*.json ./
RUN npm ci

# === Stage 2: Build ===
FROM base AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Debug: test connectivity to Google Fonts before build
RUN curl -I https://fonts.googleapis.com/css2?family=Montserrat && \
    curl -I https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf

# Build Next.js app
RUN npm run build

# === Stage 3: Production image ===
FROM base AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

# Copy only the standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"

# Start the Next.js server
CMD ["node", "server.js"]

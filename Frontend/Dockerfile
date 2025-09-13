# syntax=docker/dockerfile:1.4

# === Stage 1: Install dependencies ===
FROM node:18-alpine AS deps
WORKDIR /app

# Install dependencies with clean reproducible installs
COPY package*.json ./
RUN npm ci

# === Stage 2: Build ===
FROM node:18-alpine AS builder
WORKDIR /app

# Copy deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept env variable at build-time
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV PORT=9002

# Build Next.js app
RUN npm run build

# === Stage 3: Production image ===
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only the standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose production port
EXPOSE 9002

# Start the Next.js server
CMD ["node", "server.js"]

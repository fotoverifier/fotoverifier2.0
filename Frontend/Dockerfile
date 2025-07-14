# === Stage 1: Install dependencies ===
FROM node:18-alpine AS deps
WORKDIR /app

# Only copy package manifests for install
COPY package*.json ./

# Install *production* dependencies only
RUN npm install --production

# === Stage 2: Build ===
FROM node:18-alpine AS builder
WORKDIR /app

# Copy *all* dependencies (including devDeps) for building
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js app
RUN npm run build

# === Stage 3: Production image ===
FROM node:18-alpine AS runner
WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only what's needed for running
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

# Expose production port
EXPOSE 9002

# Start the Next.js server
CMD ["npm", "run", "start"]

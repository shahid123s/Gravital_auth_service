# FROM node:18-alpine AS builder

# WORKDIR /app

# # Copy package files
# COPY package*.json ./
# COPY prisma ./prisma/

# # Install dependencies
# RUN npm ci --only=production

# # Generate Prisma client
# RUN npx prisma generate

# # Copy source code
# COPY src ./src/
# COPY tsconfig.json ./

# # Build TypeScript
# RUN npm run build

# # Stage 2: Production
# FROM node:18-alpine AS production

# WORKDIR /app

# # Create non-root user
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# # Copy built application
# COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist
# COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
# COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
# COPY --from=builder --chown=nextjs:nodejs /app/src/infrastructure/database/generated ./src/infrastructure/database/generated

# # Copy package.json for npm scripts
# COPY --chown=nextjs:nodejs package*.json ./

# USER nextjs

# EXPOSE 3000

# # Health check
# HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
#   CMD curl -f http://localhost:3000/health || exit 1

# CMD ["node", "dist/app.js"]



FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
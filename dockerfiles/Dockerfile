# Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY . ./
COPY package*.json ./

# Install dependencies and build
RUN npm ci \
    && npm run build

# Release
FROM node:20-alpine

WORKDIR /app

# Copy
COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig-paths-dist.js /app/tsconfig.json ./

# Grant permissions for the appuser
RUN addgroup -S appuser && adduser -S appuser -G appuser \
    && chown -R appuser:appuser /app/ \
    && chmod 756 /app/

# Change to non-root privilege
USER appuser

# Set node as the entrypoint
ENTRYPOINT ["node", "-r", "./tsconfig-paths-dist.js", "dist/main.js"]

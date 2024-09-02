# build
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=build

COPY . ./
COPY package*.json ./

RUN npm ci
RUN npm run build
RUN rm -f .npmrc

# release
FROM node:20-alpine

WORKDIR /app

ENV AWS_NODEJS_CONNECTION_REUSE_ENABLED=1
ENV NODE_ENV=production

RUN chown node:node ./

COPY --from=builder /app/package.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig-paths-dist.js /app/tsconfig.json ./

USER node

EXPOSE 3000

ENTRYPOINT ["node", "-r", "./tsconfig-paths-dist.js", "dist/main.js"]

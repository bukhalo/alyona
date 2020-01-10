# Build stage
FROM node:12-alpine as builder
WORKDIR /app
ADD . ./
RUN apk add --no-cache make gcc g++ python
RUN npm ci
RUN npm run build

# Deps stage
FROM node:12-alpine as deps
ENV NODE_ENV=production
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Final stage
FROM node:12-alpine
WORKDIR /app
COPY --from=deps ./app/node_modules ./node_modules/
COPY --from=builder ./app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]

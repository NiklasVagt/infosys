FROM node:18 as builder

WORKDIR /build

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn nx build auth --prod
RUN ls -la dist/apps/server/auth


# ---------------------------------------------

FROM node:18-alpine as prisma

WORKDIR /build

COPY --from=builder /build/apps/server/auth ./apps/server/auth
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json .
COPY --from=builder /build/yarn.lock .

RUN yarn nx prisma-generate auth


# ---------------------------------------------

FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /build/dist/apps/server/auth .
COPY --from=builder /build/package.json .
COPY --from=builder /build/yarn.lock .
COPY --from=prisma /build/node_modules/@infosys node_modules/@infosys

RUN yarn install --frozen-lockfile --prod
RUN ls -la

CMD ["node", "main.js"]

EXPOSE 3334


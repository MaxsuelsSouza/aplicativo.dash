FROM node:20

WORKDIR /usr/src/app

COPY src/package.json src/pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10.5.1 --activate && pnpm install

COPY src .

EXPOSE 8081
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
CMD ["pnpm", "web"]

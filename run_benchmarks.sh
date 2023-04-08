#!/bin/sh

docker compose up -d

(cd server && bun install && bun run index.ts)
(cd benchmark; bun install && bun run rest.ts && bun run graphql.ts)

docker compose down

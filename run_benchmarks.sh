#!/bin/sh

docker compose up -d

echo "Waiting until the database is ready to accept connections.."
sleep 10
(cd seedData && bun install && bun run main.ts)
(cd server && bun install && bun run index.ts) &
sleep 3
(cd benchmark; bun install && bun run rest.ts && bun run graphql.ts)

docker compose down

# graphql-rest-comparison
Repository made to compare graphql and rest. 

## Prerequisites
- nix installed
- docker

## How to run the project
The easiest way to run the project is runnning `nix develop .` which sets up whole environment
and then running `./run_benchmarks.sh` script which spins up necesarry containers, starts server and runs tests. 

To manually run the project use `docker compose up -d` command
then open two terminals. Start server in one `cd server && bun install && bun run index.ts`
and run benchmarks in the other one `cd benchmark; bun install && bun run rest.ts && bun run graphql.ts`

## avg results after 10 benchmark runs
### naive rest
- Avg time: 69.58s
- Avg Requests per second: 14.37
- Total response size: 81MB
### naive graphql
- Avg time: 25.46s
- Avg Requests per second: 39.26
- Total response size: 18.03MB
### optimized rest
- Avg time: 1.99s
- Avg Requests per second: 500.25
- Total response size: 19.34MB
### optimized GraphQL
- Avg time: 2.27s
- Avg Requests per second: 438.78
- Total response size: 18.23MB



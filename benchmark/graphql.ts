import { benchmark } from "./benchmark.js";
import getUsers from "./getUserIds.js";

let ids = await getUsers()
console.log("GraphQL Naive Implementation")
await benchmark(async (makeReq) => {
    await Promise.all(ids.map(async (id) => {
        await makeReq(new Request("http://localhost:3001/graphqlN"), {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query GetUser($id: String!) {
                        getUser(id: $id) {
                            friends {
                            id
                            name
                            city {
                                name
                            }
                            }
                        }
                    }`,
                variables: {
                    id: id.id
                }
            }
            )
        })
    }))
}, 1)

console.log("GraphQL Optimised Implementation")
await benchmark(async (makeReq) => {
    await Promise.all(ids.map(async (id) => {
        await makeReq(new Request("http://localhost:3001/graphqlO"), {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: `
                    query GetUser($id: String!) {
                        getUser(id: $id) {
                            friends {
                            id
                            name
                            city {
                                name
                            }
                            }
                        }
                    }`,
                variables: {
                    id: id.id
                }
            }
            )
        })
    }))
}, 1)

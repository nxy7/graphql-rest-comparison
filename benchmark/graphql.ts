import { benchmark } from "./benchmark.js";
import getUsers from "./getUserIds.js";

let ids = await getUsers()
console.log("GraphQL")
await benchmark(async (makeReq) => {
    await Promise.all(ids.map(async (id) => {
        await makeReq(new Request("http://localhost:3001/graphql"), {
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

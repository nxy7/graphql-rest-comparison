import { benchmark } from "./benchmark.js";
import { FetchType } from "./fetch.js";
import getUsers from "./getUserIds.js";

let ids = await getUsers()


console.log("Naive implementation")
await benchmark(async (makeRequest) => {
  await Promise.all(ids.map(async (id, ind) => {
    let userFriends = await makeRequest(new Request("http://localhost:3001/userFriends/" + id.id), {})

    await Promise.all(userFriends.map(async (f: any) => {
      let friendData = await makeRequest(new Request("http://localhost:3001/user/" + f.u2), {})
      let city = await makeRequest(new Request("http://localhost:3001/city/" + friendData.city), {})
    }))
  }))
}, 1)


console.log("Specialized endpoint")
// specialized endpoint should not be run more than once, because backend resolves it mostly in a single
// db query and database optimizes it heavily so subsequent calls to the endpoint get much smaller request
// times, which has nothing to do with REST protocol. Naive implementation consists of multiple queries so
// database is not able to optimize it the same way, so results are not affected by it.
await benchmark(async (makeRequest) => {
  await Promise.all(ids.map(async (id) => {
    await makeRequest(new Request("http://localhost:3001/friendsCities/" + id.id), {})
  }))
}, 1)


import client from "./setup_db.js";

let ids = (await client.query("select id from user_profile")).rows.slice(0, 50)

let byteSize = 0
await benchmark(async () => {
  await Promise.all(ids.map(async (id, ind) => {
    let res = await makeRequest("http://localhost:3001/userWithFriends/" + id.id)
    // if (ind == 0)
      // console.log(res)
  }))
})
byteSize = 0
await benchmark(async () => {
  console.log("Bechmarking ")
  await Promise.all(ids.map(async (id, ind) => {
    let user = await makeRequest("http://localhost:3001/user/" + id.id)
    let userFriends = await makeRequest("http://localhost:3001/userFriends/" + id.id)
    let friends: any[] = []
    
    await Promise.all(userFriends.map(async (f: any) => {
      let friendData = await makeRequest("http://localhost:3001/user/" + f.u2)      
      friends.push(friendData)
    }))
    user.friends = friends
  }))
})



async function friendsDetails(res: any, deepLevel: number) {
  if (deepLevel <= 0) {
    return
  }
  res.friends = await Promise.all(res.friends.map(async (f: any) => {
    return await makeRequest("http://localhost:3001/user/" + f)
  }))

  await Promise.all(res.friends.map(async (f: any) => friendsDetails(f, deepLevel - 1)))
}

async function benchmark(func: () => any) {
  let start = Date.now()
  await func()

  let end = Date.now()
  let time = (end-start)/1000
  console.log("Results:")
  console.log("Time: ", time, "s")
  console.log("Requests per second:", 1000/time)
  console.log("Byte size: ", byteSize)
  console.log("Size in MB: ", byteSize / 1000000)

}
async function makeRequest(add: string) {
  let res = await fetch(add)
  let blob = await res.blob()
  byteSize += blob.size
  return (await blob.json())
}

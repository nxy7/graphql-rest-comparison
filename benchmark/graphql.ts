// make 10000 requests and time it
const args = process.argv.slice(2);
if (args.length != 1) {
    console.log("pass one just one argument to the script - userId")
    process.exit()
}
const userId = args[0]
console.log("Benchmarking graphql with userId: ", userId)
let byteSize = 0;
console.time("graphql")

let res = await fetch("http://localhost:3001/user/" + userId)

console.timeEnd("graphql")
console.log("Results:")
console.log("Byte size: ", byteSize)
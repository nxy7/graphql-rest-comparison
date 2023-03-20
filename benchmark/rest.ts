console.log("elo")

let res = await fetch("https://api.interia.pl/business/walor/getBestOrders/json?wId=33382&side=A")
const request = await res.blob()

console.log(request.size)

let x = {
    value: 1
}

let y = 1

let z = {
    x: x.value,
    y: y,
    v: 1
}

x.value++
y++
z.v++

console.log(z)


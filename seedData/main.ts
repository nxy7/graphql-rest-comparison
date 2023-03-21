import { faker } from '@faker-js/faker'
import { City } from './city.js'
import { Friendship } from './friendship.js'
import { Person } from './person.js'
import client from './setup_db.js'
import Client from './setup_db.js'

const res = await Client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message)

// generate 10 cities
let cities: City[] = []
for (let i = 0; i < 10; i++) {
    let newCity: City = { name: faker.address.city() }
    cities.push(newCity)
}
// upload all generated data to database
for (let city of cities) {
    let res = await client.query("INSERT INTO city (name) VALUES ($1) returning id", [city.name])
    city.uuid = res.rows[0].id
}

// generate 1000 people
let people: Person[] = []
for (let i = 0; i < 1000; i++) {
    let newPerson: Person = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone_number: faker.phone.number(),
        city: cities[Math.floor(Math.random() * 10)],
        avatar: faker.image.avatar()
    }
    people.push(newPerson)
}
for (let person of people) {
    let res = await client.query("INSERT INTO user_profile (name, email, city, phone_number, avatar) VALUES ($1, $2, $3, $4, $5) returning id",
        [person.name, person.email, person.city.uuid, person.phone_number, person.avatar])
    person.uuid = res.rows[0].id

}

// for each person assign 100 friendships at random
let friendships: Friendship[] = []
people.forEach((person, ind) => {
    for (let i = 0; i < 100; i++) {
        let randomInd
        do {
            randomInd = Math.floor(Math.random() * 1000)
        } while (randomInd == ind)
        let friend = people[randomInd]

        let newFriendship: Friendship = {
            u1: person, u2: friend
        }
        friendships.push(newFriendship)
    }
})

friendships.forEach(async (friendship) => {
    await client.query("INSERT INTO friendship (u1, u2) VALUES ($1, $2), ($2, $1) ON CONFLICT DO NOTHING", [friendship.u1.uuid, friendship.u2.uuid])
})

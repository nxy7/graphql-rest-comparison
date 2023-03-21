import { City } from "./city.js"

export type Person = {
    uuid?: string
    name: string
    email: string
    phone_number: string
    city: City
    avatar: string
}
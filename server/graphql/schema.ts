import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import client from '../setup_db.js';
import DataLoader from 'dataloader';

const cityLoader = new DataLoader(async (keys) => {
    const cities = (await client.query("select * from city where id = ANY($1)", [keys])).rows
    const orderedCities = keys.map((key) => {
        return cities.find(city => city.id == key) || new Error(`No results for ${key}`)
    })
    // console.log(cities, orderedCities)
    console.log("Cities loaded")
    return orderedCities
})

const city = new GraphQLObjectType({
    name: "City",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    }
})

const user: any = new GraphQLObjectType({
    name: "User",
    fields: function () {
        return {
            id: { type: GraphQLString },
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            city: {
                type: city,
                resolve: async (obj) => {
                    const city = await cityLoader.load(obj.city)
                    return city
                }
            },
            phone_number: { type: GraphQLString },
            avatar: { type: GraphQLString },
            friends: {
                type: new GraphQLList(user),
                resolve: async (obj, _, ctx, info) => {
                    let friends
                    friends = (await client.query("select up.* from user_profile up join friendship f on up.id = f.u2 where f.u1 = $1", [obj.id])).rows
                    return friends
                }
            }
        }
    },
})


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQuery',
        fields: {
            getUser: {
                type: user,
                args: {
                    id: { type: GraphQLString }
                },
                resolve: async (_, args, ctx, info) => {
                    let user = (await client.query("select * from user_profile where id = $1", [args.id])).rows[0]
                    return user
                },
            },
        },
    }),
});

export const handler = createHandler({ schema })
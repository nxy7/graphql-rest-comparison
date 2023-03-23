import express from 'express'
import { setupGraphqlRoutes } from './graphql/index.js'
import { setupRestRoutes } from './rest/index.js'

const app = express()
const port = 3001

setupRestRoutes(app)
setupGraphqlRoutes(app)

app.listen(port, () => {
    console.log("Server listening on port: " + port)
})
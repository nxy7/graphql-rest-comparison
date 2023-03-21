import type { Express } from "express";

export function setupGraphqlRoutes(app: Express) {
    app.get('/graphql', (req, res) => {
        res.send("hello graphql")
    })
}
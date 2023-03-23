import type { Express } from "express";
import { handler } from "./schema.js";


export function setupGraphqlRoutes(app: Express) {
    app.post('/graphql', handler)
}
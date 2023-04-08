import type { Express } from "express";
import { naiveHandler } from "../naiveSchema.js";
import { optimizedHandler } from "./schema.js";


export function setupGraphqlRoutes(app: Express) {
    app.post('/graphqlN', naiveHandler)
    app.post('/graphqlo', optimizedHandler)
}
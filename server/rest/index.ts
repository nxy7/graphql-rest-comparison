import type { Express } from "express";
import client from "../setup_db.js";

export function setupRestRoutes(app: Express) {
    app.get('/user/:userId', async (req, res) => {
        let uId = req.params.userId
        let dbRes = await client.query(`
            select up.*, f.friends from user_profile up
            join (
                select u1, array_agg(u2) friends from friendship group by u1
            ) f on up.id = f.u1
            where up.id = $1;
        `, [uId])
        res.send(dbRes.rows)
    })
    app.get('/city/:cityId', async (req, res) => {
        let cId = req.params.cityId
        let dbRes = await client.query("select * from city where id = $1", [cId])
        res.send(dbRes.rows)
    })
}
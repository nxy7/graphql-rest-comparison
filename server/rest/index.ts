import type { Express } from "express";
import client from "../setup_db.js";

export function setupRestRoutes(app: Express) {
  app.get('/user/:userId', async (req, res) => {
    let resp = await client.query(`
            select * from user_profile where id = $1;
        `, [req.params.userId])
    res.send(resp.rows[0])
  })

  app.get('/friendsCities/:userId', async (req, res) => {
    let rootUser = (await client.query(`
            select up.id, f.friends from user_profile up
            join (
                select u1, array_agg(u2) friends from friendship group by u1
            ) f on up.id = f.u1
            where up.id = $1;
        `, [req.params.userId])).rows[0]

    let friendsData = (await client.query(`
        select up.id user_id, up.name user_name, c.name city_name from user_profile up join city c on c.id = up.city where up.id = ANY($1)
      `, [rootUser.friends])).rows



    let resp = rootUser
    resp.friends = friendsData

    res.send(resp)
  })

  app.get('/userFriends/:userId', async (req, res) => {
    let resp = await client.query(`
      select * from friendship where u1=$1
        `, [req.params.userId])

    res.send(resp.rows)
  })

  app.get('/city/:cityId', async (req, res) => {
    let resp = await client.query("select * from city where id = $1", [req.params.cityId])
    res.send(resp.rows[0])
  })
}
import client from "./setup_db.js"

export default async function getUsers (){
    return (await client.query("select id from user_profile")).rows
}
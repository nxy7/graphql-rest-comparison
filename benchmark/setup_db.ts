import { Pool } from 'pg'

const client = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: "postgres",
    password: "postgres"
})

export default client
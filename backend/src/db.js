import { Pool } from 'pg'
 
export const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE, 
  port: process.env.DB_PORT
})

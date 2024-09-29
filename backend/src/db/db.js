import { config } from 'dotenv'; 
import pg from 'pg'
config();
const { Pool } = pg
 
const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE, 
  port: process.env.DB_PORT
});

export default pool;
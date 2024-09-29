import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv'; 

// dotenv
config()

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT 
const host = process.env.HOST;

const server = app.listen(port, host, () => {
  console.log(`⚡️ Server started on port ${port} at ${host}`);
});
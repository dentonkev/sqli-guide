import { config } from 'dotenv';
config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pool from './db/db.js'
import router from './questions/questions.js'

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// http://localhost:5000/
const port = process.env.PORT;
const host = process.env.HOST;

app.use('/api/questions', router);

const server = app.listen(port, host, () => {
  console.log(`🌮Server started on port ${port} at ${host}🌮`);
});

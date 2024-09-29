import { Router } from 'express';
import pool from '../db/db.js'

const router = Router();

router.get('/:num', async (req, res) => {
  const num = parseInt(req.params.num);
  const response = await pool.query('SELECT * FROM questions WHERE id = $1', [num]);
  console.log(response.rows[0]);
  res.json(response.rows[0])
});

router.post('/submit', async (req, res) => {
  
});

export default router;
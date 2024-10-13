import { Router } from 'express';
import pool from '../db/db.js'

const router = Router();

router.get('/:qid', async (req, res) => {
  const qid = req.params.qid;
  const response = await pool.query('SELECT * FROM questions WHERE id = $1', [qid]);;
  res.json(response.rows[0])
});

router.post('/submit', async (req, res) => {
  const { userQuery, qid } = req.body;
  const response = await pool.query('SELECT query from questions WHERE id = $1', [qid]);
  let query = response.rows[0].query
  query = query.replace("$input", userQuery)
  try {
    const sqliResponse = await pool.query(query);
    if (sqliResponse.rows.length > 0 && sqliResponse.rows[0].flag.length > 0) {
      res.json({ success: true, message: `${query} was successful, congrats!`});
    } else {
      res.json({ success: false, message: `${query} was unsuccessful, valid query incorrect injection.`});
    }
  } catch (err) { 
    console.log(err)
    res.status(400).json({ success: false, message: `${query} was unsuccessful, invalid query.`});
  }
});

export default router;
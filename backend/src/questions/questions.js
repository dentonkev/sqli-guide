import { Router } from 'express';
import pool from '../db/db.js'

const checkQuery = (query) => {
  const dangerWords = ['DROP', 'DELETE', 'ALTER', 'INSERT'];
  return !dangerWords.some((word) => query.toUpperCase().includes(word));
}

const router = Router();

router.get('/:qid', async (req, res) => {
  const qid = req.params.qid;
  try {
    const response = await pool.query('SELECT * FROM questions WHERE id = $1', [qid]);;
    if (response.rows.length > 0) {
      res.json(response.rows[0]);
    } else {
      res.status(404).json({ message: `Question ${qid} not found.` });
    }
  } catch {
    res.status(500).json({ error: `Failed to fetch question ${qid}` });
  }
});

router.get('/:qid/hints', async (req, res) => {
  const qid = req.params.qid;
  try {
    const response = await pool.query('SELECT hints FROM questions WHERE id = $1', [qid]);;
    if (response.rows.length > 0) {
      res.json(response.rows[0]);
    } else {
      res.status(404).json({ message: `Question hints for ${qid} not found.` });
    }
  } catch {
    res.status(500).json({ error: `Failed to fetch hints for question ${qid}` });
  }
});

router.post('/submit', async (req, res) => {
  const { userQuery, qid } = req.body;
  const response = await pool.query('SELECT query from questions WHERE id = $1', [qid]);
  let query = response.rows[0].query
  query = query.replace("$input", userQuery)

  if (!checkQuery(userQuery)) {
    return res.status(400).json({ success: false, query: query, message: 'Dangerous query detected, pls stop tryna break the database.' });
  }

  try {
    const sqliResponse = await pool.query(query);
    if (sqliResponse.rows.length > 0 && sqliResponse.rows[0].flag.length > 0) {
      res.json({ success: true, query: query, message: "Successful injection!" });
    } else {
      res.json({ success: false, query: query, message: "Unsuccessful injection, valid query" });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: "Unsuccessful injection, invalid query" });
  }
});

export default router;
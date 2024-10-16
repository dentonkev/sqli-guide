import { Router } from 'express';
import pool from '../db/db.js'

const checkQuery = (query) => {
  const dangerWords = ['DROP', 'DELETE', 'ALTER', 'INSERT'];
  return !dangerWords.some((word) => query.toUpperCase().includes(word));
}

const inject = async (res, query, userQuery, qNum) => {
  if (!checkQuery(userQuery)) {
    return res.status(400).json({ success: false, query: query, message: 'Dangerous query detected, pls stop tryna break the database.' });
  }

  try {
    const sqliResponse = await pool.query(query);
    const correctFlag = await pool.query('SELECT flag FROM secrets WHERE question_id = $1', ['q' + qNum]);

    if (sqliResponse.rows.length > 0 && sqliResponse.rows[0].flag.length > 0 && sqliResponse.rows[qNum - 1].flag === correctFlag.rows[0].flag) {
      return res.json({ success: true, query: query, message: "Successful injection!" });
    } else {
      return res.json({ success: false, query: query, message: "Unsuccessful injection, valid query" });
    }
  } catch (err) {
    return res.json({ success: false, message: "Unsuccessful injection, invalid query" });
  }
}

const router = Router();

router.get('/:qid', async (req, res) => {
  const qid = req.params.qid;
  try {
    const response = await pool.query('SELECT * FROM questions WHERE id = $1', [qid]);
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

router.post('/submit/q1', async (req, res) => {
  const { userQuery } = req.body;
  const response = await pool.query('SELECT query FROM questions WHERE id = $1', ['q1']);
  let query = (response.rows[0].query).replace('$1', userQuery);
  return inject(res, query, userQuery, 1);
});

router.post('/submit/q2', async (req, res) => {
  const { userQuery } = req.body;
  const values = userQuery.split(', ');

  if (values.length !== 2) {
    return res.status(400).json({ success: false, message: 'Please required input format' });
  }

  const response = await pool.query('SELECT query FROM questions WHERE id = $1', ['q2']);
  let query = response.rows[0].query
  
  query = query.replace("$1", values[0]);
  query = query.replace("$2", values[1]);
  return inject(res, query, userQuery, 2);
});

export default router;
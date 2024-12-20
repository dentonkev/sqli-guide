import { Router } from 'express';
import pool from '../db/db.js'

const checkQuery = (query) => {
  const dangerWords = ['DROP', 'DELETE', 'ALTER'];
  return !dangerWords.some((word) => query.toUpperCase().includes(word));
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

router.post('/submit/q1', async (req, res) => {
  const { userQuery } = req.body;
  const response = await pool.query('SELECT query FROM questions WHERE id = $1', ['q1']);
  let query = (response.rows[0].query).replace('$1', userQuery);

  if (!checkQuery(userQuery)) {
    return res.json({ success: false, query: query, message: 'Dangerous query detected, pls stop tryna break the database.' });
  }

  try {
    const sqliResponse = await pool.query(query);
    const correctFlag = await pool.query('SELECT * FROM q1secrets');
    
    if (sqliResponse.rows.length > 0 && sqliResponse.rows[0].flag.length > 0 && sqliResponse.rows[0].flag === correctFlag.rows[0].flag) {
      return res.json({ success: true, res: sqliResponse.rows[0].flag, query: query, message: "Successful injection!" });
    } else {
      return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, valid injected query." });
    }
  } catch (err) {
    return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, invalid injected query." });
  }
});

router.post('/submit/q2', async (req, res) => {
  const { userQuery } = req.body;
  const values = userQuery.split(', ');

  if (values.length !== 2) {
    return res.json({ success: false, query: 'Invalid Injection', message: 'Please provide both username and password in the format: <username>, <password>' });
  }

  const response = await pool.query('SELECT query FROM questions WHERE id = $1', ['q2']);
  let query = response.rows[0].query
  
  query = query.replace("$1", values[0]);
  query = query.replace("$2", values[1]);

  if (!checkQuery(userQuery)) {
    return res.json({ success: false, query: query, message: 'Dangerous query detected, pls stop tryna break the database.' });
  }

  try {
    const sqliResponse = await pool.query(query);
    const correctFlag = await pool.query('SELECT * FROM q2secrets');

    if (sqliResponse.rows.length > 0 && sqliResponse.rows[0].flag.length > 0 && sqliResponse.rows[0].flag === correctFlag.rows[0].flag) {
      return res.json({ success: true, res: sqliResponse.rows[0].flag, query: query, message: "Successful injection!" });
    } else {
      return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, valid injected query." });
    }
  } catch (err) {
    return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, invalid injected query." });
  }
});

router.post('/submit/q3', async (req, res) => {
  const { userQuery } = req.body;
  const response = await pool.query('SELECT query FROM questions WHERE id = $1', ['q3']);
  let query = (response.rows[0].query).replace('$1', userQuery);

  if (!checkQuery(userQuery)) {
    return res.json({ success: false, query: query, message: 'Dangerous query detected, pls stop tryna break the database.' });
  }

  try {
    const sqliResponse = await pool.query(query);
    const correctFlag = await pool.query('SELECT * FROM q3secrets');
    
    if (sqliResponse.rows.length > 0 && sqliResponse.rows[0].username === correctFlag.rows[0].flag) {
      return res.json({ success: true, res: sqliResponse.rows[0].username, query: query, message: "Successful injection!" });
    } else {
      return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, valid injected query." });
    }
  } catch (err) {
    return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, invalid injected query." });
  }
});

router.post('/submit/q4', async (req, res) => {
  let { userQuery } = req.body;
  const filter = /\b(SELECT|select|UNION|union|WHERE|where|FROM|from)\b/g;
  userQuery = userQuery.replace(filter, '');

  const response = await pool.query('SELECT query FROM questions WHERE id = $1', ['q4']);
  let query = (response.rows[0].query).replace('$1', userQuery);

  if (!checkQuery(userQuery)) {
    return res.json({ success: false, query: query, message: 'Dangerous query detected, pls stop tryna break the database.' });
  }

  try {
    const sqliResponse = await pool.query(query);
    const correctFlag = await pool.query('SELECT * FROM secretsq4');
    
    if (sqliResponse.rows.length > 0 && sqliResponse.rows[0].name === correctFlag.rows[0].flag) {
      return res.json({ success: true, res: sqliResponse.rows[0].name, query: query, message: "Successful injection!" });
    } else {
      let result = '';
      for (let row of sqliResponse.rows) {
        result += Object.values(row).join(', ') + '\n';
      }
      return res.json({ success: false, res: result, query: query, message: "Unsuccessful injection, valid injected query." });
    }
  } catch (err) {
    return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, invalid injected query." });
  }
});

router.post('/submit/q5', async (req, res) => {
  let { userQuery } = req.body;
  const filter = /\b(SELECT|UNION|WHERE|INSERT|UPDATE|DELETE|FROM)\b/g;
  userQuery = userQuery.replace(filter, '');

  const response = await pool.query('SELECT query FROM questions WHERE id = $1', ['q5']);
  let query = (response.rows[0].query).replace('$1', userQuery);

  if (!checkQuery(userQuery)) {
    return res.json({ success: false, query: query, message: 'Dangerous query detected, pls stop tryna break the database.' });
  }

  try {
    const sqliResponse = await pool.query(query);
    const insertedRows = await pool.query('SELECT * FROM q5secrets');

    if (insertedRows.rows.length > 0) {
      return res.json({ success: true, res: 'A row has been successfully inserted into q5secrets!', query: query, message: "Successful injection!" });
    } else {
      let result = '';
      for (let row of sqliResponse.rows) {
        let formattedRow = Object.entries(row).map(([key, value]) => `${key}: ${value}`).join(', '); 
        result += formattedRow + '\n'; 
      }
      return res.json({ success: false, res: result, query: query, message: "Unsuccessful injection, valid injected query." });
    }
  } catch (err) {
    console.log((err));
    return res.json({ success: false, res: '', query: query, message: "Unsuccessful injection, invalid injected query." });
  }
});


export default router;
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [userQuery, setUserQuery] = useState({});
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const qids = ['q1', 'q2'];

  useEffect(() => {
    const getQuestions = async () => {
      let receivedQuestions = []
      for (const qid of qids) {
        const res = await axios.get(`http://localhost:5000/api/questions/${qid}`);
        receivedQuestions.push(res.data)
      }
      setQuestions(receivedQuestions);
    }
    getQuestions();
  }, []);

  const submit = async (qid) => {
    console.log("Submitting query:", { userQuery: userQuery[qid], qid: qid });
    const res = await axios.post(`http://localhost:5000/api/questions/submit`, {
      userQuery: userQuery[qid],
      qid: qid
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    setMessage(res.data.message);
    setQuery(res.data.query);
  }

  const userInput = async (input, qid) => {
    setUserQuery({
      ...userQuery,
      [qid]: input.target.value,
    });;
  }

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <div>{question.query}</div>
          <div>
            <input
              type="text"
              value={userQuery[question.id] || ''}
              placeholder='Enter SQL Injection'
              onChange={(input) => userInput(input, question.id)}
            />
            <button onClick={() => submit(question.id)} >Submit</button>
            <div>{message || ''}</div>
            <div><p>Your Query:</p>{query || ''}</div>
          </div>
          <div>{question.hints.join(', ')}</div>
        </div>
      ))}
    </div>
  );
}

export default Questions;
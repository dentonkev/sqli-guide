import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
  const { qid } = useParams();
  const [question, setQuestion] = useState();
  const [userQuery, setUserQuery] = useState(null);
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const getQuestion = async () => {
      const res = await axios.get(`http://localhost:5000/api/questions/${qid}`);
      setQuestion(res.data);
    }
    getQuestion();
  }, [qid]);

  const submit = async () => {
    const res = await axios.post(`http://localhost:5000/api/questions/submit/${qid}`, {
      userQuery: userQuery,
    });
    setMessage(res.data.message);
    setQuery(res.data.query);
  }

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{question.query}</h3>
        <div>
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder='Enter SQL Injection'
          />
          <button onClick={() => submit()} >Submit</button>
          <div>{message}</div>
          <div>{query}</div>
        </div>
        <div>Hints: {question.hints.join(', ')}</div>
    </div>
  );
}

export default Questions;
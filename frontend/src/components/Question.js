import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Questions = () => {
  const { qid } = useParams();
  const [question, setQuestion] = useState();
  const [userQuery, setUserQuery] = useState('');
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [success, setSuccess] = useState(false);
  const [hints, setHints] = useState([]);

  useEffect(() => {
    const getQuestion = async () => {
      const res = await axios.get(`http://localhost:5000/api/questions/${qid}`);
      setQuestion(res.data);
      setHints(new Array(res.data.hints.length).fill(false));
    }
    getQuestion();
  }, [qid]);

  const submit = async () => {
    const res = await axios.post(`http://localhost:5000/api/questions/submit/${qid}`, {
      userQuery: userQuery,
    });
    setMessage(res.data.message);
    setQuery(res.data.query);

    if (res.data.success) {
      setSuccess(true);
    }
  }

  const toggleHint = (index) => {
    let newHints = [...hints];
    newHints[index] = !newHints[index];
    setHints(newHints);
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

          <p><b>Injected query:</b> {query}</p>
          <p><b>Response: </b><span style={{ color: success === true ? 'green' : 'red'}}>{message}</span></p>
        </div>
        <div>
          <h3>Hints:</h3>
          {
            question.hints.map((hint, index) => (
              <div key={index}>
                <button 
                  onClick={() => toggleHint(index)}>
                  Toggle Hint {index + 1}
                </button>
                <p>{hints[index] ? hint : ''}</p>
              </div>
            ))
          }
        </div>
    </div>
  );
}

export default Questions;
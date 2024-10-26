import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Question.css'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import 'boxicons';
import NavBar from "../components/navBar"

const Question = () => {
  const { qid } = useParams();
  const [question, setQuestion] = useState();
  const [userQuery, setUserQuery] = useState('');
  const [message, setMessage] = useState('');
  const [res, setRes] = useState('');
  const [query, setQuery] = useState('');
  const [success, setSuccess] = useState(false);
  const [hints, setHints] = useState([]);
  const [Details, setDetails] = useState(null);

  useEffect(() => {
    const getQuestion = async () => {
      const res = await axios.get(`http://localhost:5000/api/questions/${qid}`);
      setQuestion(res.data);
      setHints(new Array(res.data.hints.length).fill(false));

      const d = await import(`../qDetails/${qid}.js`);
      setDetails(d.default);
    }
    getQuestion();
  }, [qid]);

  const submit = async () => {
    const res = await axios.post(`http://localhost:5000/api/questions/submit/${qid}`, {
      userQuery: userQuery,
    });
    setMessage(res.data.message);
    setQuery(res.data.query);
    setRes(res.data.res);

    if (res.data.success) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }

  const toggleHint = (index) => {
    let newHints = [...hints];
    newHints[index] = !newHints[index];
    setHints(newHints);
  }

  if (!question) {
    return <div className="error">404 Page Not Found, requested question does not exist buddy</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="left-half">
          <div className="panel-header">Description<box-icon name='paper-plane' color='#66a2c5'></box-icon></div>
          <div className="left-panel">
            {Details}
            <h2>Question {qid[1]}:</h2>
            <SyntaxHighlighter language="sql" style={atomDark} customStyle={{ fontSize: '0.9rem' }}>
              {question.query}
            </SyntaxHighlighter>
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
        </div>
        
        <div className="right-half">
          <div className="top-right-panel">
            <div className="panel-header">Injection<box-icon name='injection' color='#519369'></box-icon></div>
            <div className="top">
              <h3>Inject SQL</h3>
              <p>Note: Use comma seperated input when injecting multiple values.</p>
              <p>Example: &lt;injection 1&gt;, &lt;injection 2&gt;</p>
              <div className="top-injection-submission"> 
                <input
                  type="text"
                  size="45"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder='Enter SQL Injection'
                />
                <button onClick={() => submit()} >Submit</button>
              </div>
            </div>
          </div>
          
          <div className="bottom-right-panel">
            <div className="panel-header">Results<box-icon name='ghost' color='#e1f0a5'></box-icon></div>
            <div className="bottom">
              <p><strong>Injected Query:</strong></p>
                <SyntaxHighlighter language="sql" style={atomDark} customStyle={{ fontSize: '0.9rem' }}>
                  {query},
                </SyntaxHighlighter>
              <p><strong>Response: </strong>{res}</p>
              <p><strong>Result: </strong><span style={{ color: success === true ? 'green' : 'red'}}>{message}</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Question;
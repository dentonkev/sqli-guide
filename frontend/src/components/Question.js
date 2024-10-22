import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Question.css'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import 'boxicons';

const Question = () => {
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
    <div className="container">
      <div className="left-half">
        <div className="panel-header">Description<box-icon name='paper-plane' color='#66a2c5'></box-icon></div>
        <div className="left-panel">
          <h3>Question {qid[1]} Details:</h3>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
          </div>
          <h3>Question {qid[1]}:</h3>
          <SyntaxHighlighter language="sql" style={atomDark}>
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
              <SyntaxHighlighter language="sql" style={atomDark} customStyle={{ fontSize: '1.15rem' }}>
                {query},
              </SyntaxHighlighter>
            <p><strong>Response: </strong><span style={{ color: success === true ? 'green' : 'red'}}>{message}</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Question;
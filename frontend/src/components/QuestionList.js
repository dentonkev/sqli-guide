import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const qids = ['q1', 'q2', 'q3', 'q4', 'q5'];

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
  }, [qids]);

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <Link to={`/${question.id}`}>
            <h3>Question {question.id}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default QuestionList;
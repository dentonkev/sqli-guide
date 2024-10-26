import React from 'react';
import { Link, useParams } from 'react-router-dom';

const NavBar = () => {
  const { qid } = useParams();

  const nextQuestionNum = parseInt(qid[1]) + 1;
  const nextQ = 'q' + (nextQuestionNum).toString();

  const prevQuestionNum = parseInt(qid[1]) - 1;
  const prevQ = 'q' + (prevQuestionNum).toString();

  if (qid === 'q1') {
    return (
      <div className="NavBar">
        <Link to="/" className="home">Home</Link>
        <Link to={`/${nextQ}`} className="home">Next Question: Question {nextQuestionNum}</Link>
      </div>
    )
  } else if (qid === 'q10') {
    return (
      <div className="NavBar">
        <Link to="/" className="home">Home</Link>
        <Link to={`/${prevQ}`} className="home">Previous Question: Question {prevQuestionNum}</Link>
      </div>
    )
  } else {
    return (
      <div className="NavBar">
        <Link to={`/${prevQ}`} className="home">Previous Question: Question {prevQuestionNum}</Link>
        <Link to="/" className="home">Home</Link>
        <Link to={`/${nextQ}`} className="home">Next Question: Question {nextQuestionNum}</Link>
      </div>
    )
  }
}

export default NavBar;
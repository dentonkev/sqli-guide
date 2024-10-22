import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Questions from './components/Question.js';
import QuestionList from './components/QuestionList.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/:qid" element={<Questions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

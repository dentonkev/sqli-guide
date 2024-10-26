import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const q1 = () => (
  <div>
    <h3>Understanding SQL Injection (SQLI)</h3>
    <p>
      SQL (Structured Query Language) is a programming language used to interact with databases for operations like retrieving, inserting, updating, and deleting data. If you are not familiar with SQL or need a refresher check out the following resources:
      <ul>
        <li><a href="https://www.codecademy.com/learn/learn-sql" target="_blank" rel="noopener noreferrer">Codecademy SQL Course</a></li>
        <li><a href="https://www.w3schools.com/sql/" target="_blank" rel="noopener noreferrer">W3Schools SQL Tutorial</a></li>
      </ul>
    </p>
    <h3>Exploiting SQL Injection</h3>
    <p>
      SQL Injection (SQLI) is a vulnerability that occurs when user input is not properly sanitised. Attackers exploit this by injecting malicious SQL code into queries, allowing them to manipulate the behavior of the application and interact with the database directly.
    </p>
    <h3>The 'OR 1=1' Technique</h3>
    <p>
      The 'OR 1=1' technique is a method where the attacker inserts an OR condition that always evaluates to true. For example:
    </p>
    <SyntaxHighlighter language="sql" style={atomDark} customStyle={{ fontSize: '0.9rem' }}>
      SELECT darkMatterFormula FROM garage WHERE password = '$1';
    </SyntaxHighlighter>
    <p>
      A normal user would input something like "ricksucks123" to get into the garage, however by injecting a payload that adds a clause like <code>OR 1=1</code>, the query will return true, effectively bypassing any authentication implemented by the application.
    </p>
    <p>
      Your task is to craft an SQL injection payload that leverages this technique. Focus on how you can inject a condition that forces the query to always be valid, and use hints if you are stuck.
    </p>
  </div>
);

export default q1;

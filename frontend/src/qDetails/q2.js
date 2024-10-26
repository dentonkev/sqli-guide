import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const q2 = () => (
  <div>
    <h3>SQL Injection with Multiple Parameters</h3>
    <p>
      In this question, the query is designed to use multiple parameters such that it validates both a <code>username</code> and a <code>password</code>:
    </p>
    <SyntaxHighlighter language="sql" style={atomDark} customStyle={{ fontSize: '0.8rem' }}>
      SELECT darkMatterFormula FROM garage WHERE username = '$1' AND password = '$2';
    </SyntaxHighlighter>
    <h3>Key Considerations</h3>
    <p>
      To exploit this query, think about how you can structure your payload to manipulate either the <code>username</code> or <code>password</code> fields (or both) to bypass the intended logic. Pay close attention to how the <code>AND</code> operator connects these two conditions.
    </p>
    <h3>Commenting Out Extra Code</h3>
    <p>
      You might encounter additional code after the parameters in the query. SQL comments (<code>--</code>) can be used to ignore the remaining parts of the query.
    </p>
  </div>
);

export default q2;

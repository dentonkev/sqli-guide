import React from 'react';

const q3 = () => (
  <div>
    <h3>Using UNION SELECT for SQL Injection</h3>
    <p>
      This question utilises the <strong>UNION SELECT</strong> injection method, which allows you to combine the results of two or more SELECT queries. For a UNION SELECT clause to work, the number of columns selected in your injection must match the number of columns in the original query. Take a look at the following documentation for more information about <strong>UNION SELECT</strong>
    </p>
    <ul>
        <li><a href="https://www.postgresql.org/docs/current/queries-union.html" target="_blank" rel="noopener noreferrer">PSQL UNION documentation</a></li>
      </ul>
    <p>
      The goal for this question is to retrieve the flag from the <strong style={{ color: '#fb9ab5' }}>q3secrets</strong> table.
    </p>
  </div>
);

export default q3;

import React from 'react';

const q5 = () => (
  <div>
    <h3>Table Structures and Inserting Data with stacked Queries</h3>
    <p>
      This question demonstrates the power of SQLI, where it not only can read data, but it can also inject data to the database. 
      In this question, you need to figure out the structure of the <strong style={{ color: '#fb9ab5' }}>q5secrets</strong> table (column names and types). 
    </p>
    <p>
      Once you know the structure of the table, craft a SQL injection payload to insert a new row into the table. 
    </p>
    <p>
      Your goal for this question is not to get a flag, rather to insert a new row into the <strong style={{ color: '#fb9ab5' }}>q5secrets</strong> table.
    </p>
  </div>
);

export default q5;

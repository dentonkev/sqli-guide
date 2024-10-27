// src/qDetails/q4.js
import React from 'react';

const q4 = () => (
  <div>
    <h3>Finding Table Names and Extracting Data</h3>
    <p>
      In this question, the goal is to discover the table name and retrieve the flag from it. 
    </p>
    <p>
      The first step is to use <strong>INFORMATION_SCHEMA.TABLES</strong> to find the table name. The <code>INFORMATION_SCHEMA</code> is a special schema that contains information about all other schemas in the database, including table names.
    </p>
    <p>
      Construct a <strong>UNION SELECT</strong> query to list all tables and then identify the one containing the flag.
    </p>
    <p>
      Once you know the table name, inject another payload to retrieve the flag. 
    </p>
  </div>
);

export default q4;

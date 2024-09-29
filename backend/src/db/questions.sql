-- q1
INSERT INTO questions (query, answer, hints) 
VALUES (
    'SELECT * FROM secrets WHERE session = "$input";',
    'test" OR 1 = 1; -- ',
    ARRAY [
        'An OR clause could be helpful here', 
        'After your input there still might be some code, try commenting it out', 
        'Comments in sql must be followed by a space'
    ]
);

-- q2
INSERT INTO questions (query, answer, hints) 
VALUES (
    '"SELECT username FROM users WHERE username = ''{username}'' and password = %s", (password,)',
    'test'' OR 1 = 1; -- ',
    ARRAY [
        'An OR clause could be helpful here', 
        'After your input there still might be some code, try commenting it out', 
        'Comments in sql must be followed by a space',
        'Carefully look at string sytax in the provided SELECT statement'
    ]
);
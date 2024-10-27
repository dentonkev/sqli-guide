DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    query TEXT NOT NULL,
    answer TEXT NOT NULL,
    hints TEXT[] NOT NULL
);

DROP TABLE IF EXISTS q1secrets;
CREATE TABLE IF NOT EXISTS q1secrets (
    question_id TEXT PRIMARY KEY,
    flag TEXT NOT NULL
);

DROP TABLE IF EXISTS q2secrets;
CREATE TABLE IF NOT EXISTS q2secrets (
    flag TEXT NOT NULL,
    username TEXT NULL,
    password TEXT NULL
);

DROP TABLE IF EXISTS q3secrets;
CREATE TABLE IF NOT EXISTS q3secrets (
    flag TEXT NOT NULL
);

DROP TABLE IF EXISTS q3users;
CREATE TABLE IF NOT EXISTS q3users (
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

DROP TABLE IF EXISTS secretsq4;
CREATE TABLE IF NOT EXISTS secretsq4 (
    flag TEXT NOT NULL
);

DROP TABLE IF EXISTS q4users;
CREATE TABLE IF NOT EXISTS q4users (
    age INTEGER NOT NULL,
    dog_name TEXT NOT NULL,
    name TEXT NOT NULL
);

DROP TABLE IF EXISTS q5secrets;
CREATE TABLE IF NOT EXISTS q5secrets (
    flag TEXT NOT NULL,
    created_by TEXT NOT NULL, 
    created_by_age INTEGER NOT NULL
);

DROP TABLE IF EXISTS q5users;
CREATE TABLE IF NOT EXISTS q5users (
    username TEXT NOT NULL,
    password TEXT NOT NULL
);
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
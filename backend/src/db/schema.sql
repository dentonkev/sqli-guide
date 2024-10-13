DROP TABLE IF EXISTS questions;
CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    query TEXT NOT NULL,
    answer TEXT NOT NULL,
    hints TEXT[] NOT NULL
);

DROP TABLE IF EXISTS secrets;
CREATE TABLE IF NOT EXISTS secrets (
    question_id TEXT PRIMARY KEY,
    flag TEXT NOT NULL
);
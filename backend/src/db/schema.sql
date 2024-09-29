DROP TABLE IF EXISTS questions;

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    query TEXT,
    answer TEXT,
    hints TEXT[]
);
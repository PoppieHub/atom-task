DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS users;

-- Связь One-To-Many по отношению: users -> clients --

CREATE TABLE clients (
     account_number INTEGER PRIMARY KEY,
     last_name TEXT NOT NULL,
     first_name TEXT NOT NULL,
     second_name TEXT,
     birth_date DATE NOT NULL,
     inn INTEGER NOT NULL UNIQUE,
     status INTEGER NOT NULL DEFAULT 0,
     responsible_person TEXT NOT NULL,

     FOREIGN KEY (responsible_person) REFERENCES users (full_name)
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
CREATE DATABASE diplomDB;
 \c diplomDB

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE regular_exceptions(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NULL REFERENCES users(id),
    word VARCHAR(255) NOT NULL,
    regular_exception VARCHAR(10000) NOT NULL
);

CREATE TABLE settings(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    settings VARCHAR(255) NOT NULL
);
    
CREATE TABLE statistic(
    id SERIAL NOT NULL PRIMARY KEY ,
    user_id INTEGER NULL REFERENCES users(id),
    website_url VARCHAR(255) NOT NULL,
    counter_banned_words VARCHAR(255) NOT NULL,
    banned_words JSONB NOT NULL
);

INSERT INTO users(login, password_hash) VALUES ('Admin', 'Admin');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (1,'Admin', 'Admin');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (1,'Fart', 'AJami');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (1,'Nme', 'Nemo');
INSERT INTO settings(user_id, settings) VALUES (1, '1111');

INSERT INTO users(login, password_hash) VALUES ('Nimda', 'Nimda');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (2,'Nimda', 'Nimda');
INSERT INTO settings(user_id, settings) VALUES (2, '1111');

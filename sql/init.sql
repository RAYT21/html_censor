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
    regular_exception VARCHAR(255) NOT NULL
);

CREATE TABLE settings(
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    settings_json JSONB NOT NULL
);
    
CREATE TABLE ml_models(
    id SERIAL NOT NULL PRIMARY KEY ,
    user_id INTEGER NULL REFERENCES users(id),
    path_to_model VARCHAR(100) NOT NULL
);

INSERT INTO users(login, password_hash) VALUES ('Admin', 'Admin');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (1,'Admin', 'Admin');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (1,'Fart', 'AJami');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (1,'Nme', 'Nemo');
INSERT INTO settings(user_id, settings_json) VALUES (1, '{"dog": "cat", "frog": "frat"}');
INSERT INTO ml_models(user_id, path_to_model) VALUES (1, '/Admin/my/path/to');

INSERT INTO users(login, password_hash) VALUES ('Nimda', 'Nimda');
INSERT INTO regular_exceptions(user_id, word, regular_exception) VALUES (2,'Nimda', 'Nimda');
INSERT INTO settings(user_id, settings_json) VALUES (2, '{"cat": "dog", "flag": "tag"}');
INSERT INTO ml_models(user_id, path_to_model) VALUES (2, '/Nimda/my/path/to');

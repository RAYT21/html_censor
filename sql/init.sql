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
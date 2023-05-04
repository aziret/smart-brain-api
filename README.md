User login/signin API for face-recognition app that consists of 3 parts:

1. backend for user login/signin (this app)
2. frontend for login/signing and using Clarifai's face-detection API
3. DB for saving users

## How to start:

1. Create a db for storing user data, e.g. `createdb 'smart-brain'` -> `psql 'smart-brain'`
2. Create the following tables in your DB:

- The queries here are from postgres console:

```
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
);
```

3. Install packages from npm registry: `npm install`
4. Fill in env variables in .env file, e.g.:

```
DB_HOST='127.0.0.1'
DB_USER=db_username
DB_PASSWORD=db_password
DB_NAME=db_name
```

5. Start the server, here nodemon is used: `npm start`

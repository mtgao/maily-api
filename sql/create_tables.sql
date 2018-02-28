CREATE TABLE IF NOT EXISTS accounts (
  user_name varchar(256) PRIMARY KEY,
  user_password varchar(256)
);


CREATE TABLE IF NOT EXISTS celebrity (
  id serial PRIMARY KEY,
  name varchar(64),
  gender varchar(12),
  occupation varchar(32),
  nationality varchar(32),
  dob date,
  appearances jsonb
);

CREATE TABLE IF NOT EXISTS media (
  id serial PRIMARY KEY,
  name varchar(128),
  description varchar(128),
  link varchar(256),
  category varchar(16),
  celebrities jsonb
);
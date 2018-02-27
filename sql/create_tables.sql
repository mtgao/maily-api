CREATE TABLE IF NOT EXISTS accounts (
  user_name varchar(256) PRIMARY KEY,
  user_password varchar(256)
);

CREATE TABLE IF NOT EXISTS celebrity (
  id serial PRIMARY KEY,
  name varchar(64),
  occupation varchar(32),
  nationality varchar(32),
  dob date,
  appearances jsonb
);


/* Define category enum */ 
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'categories') THEN
        CREATE TYPE categories as ENUM (
          'interview',
          'talk show',
          'commercial',
          'variety show',
          'music show',
          'television',
          'movie',
          'vlive',
          'radio show',
          'misc'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS media (
  id serial PRIMARY KEY,
  name varchar(128),
  description varchar(128),
  link varchar(256),
  category categories,
  celebrities jsonb
);
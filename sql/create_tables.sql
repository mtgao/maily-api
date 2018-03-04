CREATE TABLE IF NOT EXISTS accounts (
  user_name varchar(256) PRIMARY KEY,
  user_password varchar(256)
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


CREATE TABLE IF NOT EXISTS celebrity (
  id serial PRIMARY KEY, 
  firstname varchar(16),
  lastname varchar(16),
  firstname_birth varchar(16),
  lastname_birth varchar(16),
  fullname_native varchar(32),
  gender varchar(12),
  occupation varchar(32),
  nationality varchar(32),
  dob date,
  appearances jsonb,
  unique (fullname_native, dob)
);


CREATE TABLE IF NOT EXISTS media (
  id serial PRIMARY KEY,
  name varchar(128),
  description varchar(128),
  link varchar(256) unique,
  category categories,
  celebrities jsonb
);
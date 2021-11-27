-- Drop and recreate Lists table (Example)

DROP TABLE IF EXISTS lists CASCADE;
CREATE TABLE lists (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL
);

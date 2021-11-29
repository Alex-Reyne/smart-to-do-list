-- Drop and recreate Items table (Example)

DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  delete_date_time DATE DEFAULT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

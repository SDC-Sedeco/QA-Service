DROP TABLE questions;
CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT 'f',
  helpful INT DEFAULT 0
);


-- COPY CSV DATA for questions
-- ALTER TABLE questions SET UNLOGGED;
-- COPY questions FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/questions.csv' DELIMITER ',' CSV HEADER;
-- ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
-- ALTER TABLE questions ALTER COLUMN date SET NOT NULL;
-- ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE questions SET LOGGED;

ALTER TABLE questions SET UNLOGGED;
COPY questions FROM '/csv/questions.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE questions ALTER COLUMN date SET NOT NULL;
ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE questions SET LOGGED;


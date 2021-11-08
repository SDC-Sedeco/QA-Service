CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT 'f',
  helpful INT DEFAULT 0
);


-- COPY CSV DATA FOR answers AND SET CONSTRAINTS
-- ALTER TABLE answers SET UNLOGGED;
-- COPY answers FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/answers.csv' DELIMITER ',' CSV HEADER;
-- ALTER TABLE answers ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
-- ALTER TABLE answers ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE answers ADD CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id);
-- ALTER TABLE answers SET LOGGED;

ALTER TABLE answers SET UNLOGGED;
COPY answers FROM '/csv/answers.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE answers ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE answers ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE answers ADD CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE answers SET LOGGED;
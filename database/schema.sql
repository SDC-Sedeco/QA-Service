DROP DATABASE qa;
CREATE DATABASE qa;


CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT NOT NULL,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT 'f',
  helpful INT DEFAULT 0
);


CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT NOT NULL,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  reported BOOLEAN DEFAULT 'f',
  helpful INT DEFAULT 0
);


CREATE TABLE IF NOT EXISTS photos (
 id SERIAL PRIMARY KEY,
 answer_id INT NOT NULL,
 url VARCHAR(255)
);


-- ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
-- ALTER TABLE questions ALTER COLUMN date SET NOT NULL;
-- ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;


-- ALTER TABLE answers ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
-- ALTER TABLE answers ALTER COLUMN date SET NOT NULL;
-- ALTER TABLE answers ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE answers ADD CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id);


-- ALTER TABLE photos ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id);

-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_id ON questions(product_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_question_id ON answers(question_id);
-- CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_answer_id ON photos(answer_id);

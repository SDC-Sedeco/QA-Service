CREATE DATABASE qa;
DROP DATABASE [IF EXISTS] qa;
-- psql postgres -U louisa
-- \c qa


-- Table: public.questions
-- DROP TABLE public."questions";

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


-- Table: public.answers
-- DROP TABLE public."answers";

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


-- Table: public.photos
-- DROP TABLE public."photos";

CREATE TABLE IF NOT EXISTS photos (
 id SERIAL PRIMARY KEY,
 answer_id INT NOT NULL,
 url VARCHAR(255)
);


-- COPY CSV DATA for questions
ALTER TABLE questions SET UNLOGGED;
COPY questions FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/questions.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE questions ALTER COLUMN date SET NOT NULL;
ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE questions SET LOGGED;

-- COPY CSV DATA FOR answers AND SET CONSTRAINTS
ALTER TABLE answers SET UNLOGGED;
COPY answers FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/answers.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE answers ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE answers ALTER COLUMN date SET NOT NULL;
ALTER TABLE answers ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE answers ADD CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE;
ALTER TABLE answers SET LOGGED;

-- COPY CSV DATA FOR photos AND SET CONSTRAINTS
ALTER TABLE photos SET UNLOGGED;
COPY photos FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE photos ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id) ON DELETE CASCADE;
ALTER TABLE photos SET LOGGED;

-- CREATE INDEXES ON FOREIGN KEYS
CREATE INDEX idx_product_id ON questions(product_id);
CREATE INDEX idx_question_id ON answers(question_id);
CREATE INDEX idx_answer_id ON photos(answer_id);








-- With Docker

-- COPY CSV DATA for questions
ALTER TABLE questions SET UNLOGGED;
COPY questions FROM '/csv/questions.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE questions SET LOGGED;

-- COPY CSV DATA FOR answers AND SET CONSTRAINTS
ALTER TABLE photos SET UNLOGGED;
COPY photos FROM '/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE photos ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id);
ALTER TABLE photos SET LOGGED;

-- COPY CSV DATA FOR photos AND SET CONSTRAINTS
ALTER TABLE photos SET UNLOGGED;
COPY photos FROM '/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE photos ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id);
ALTER TABLE photos SET LOGGED;

------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------

-- Without Docker

-- COPY CSV DATA for questions
ALTER TABLE questions SET UNLOGGED;
COPY questions FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/questions.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE questions SET LOGGED;

-- COPY CSV DATA FOR answers AND SET CONSTRAINTS
ALTER TABLE answers SET UNLOGGED;
COPY answers FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/answers.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE answers ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE answers ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE answers ADD CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id);
ALTER TABLE answers SET LOGGED;

-- COPY CSV DATA FOR photos AND SET CONSTRAINTS
ALTER TABLE photos SET UNLOGGED;
COPY photos FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE photos ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id);
ALTER TABLE photos SET LOGGED;
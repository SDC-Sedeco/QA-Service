--This should be done before indexing

ALTER TABLE questions SET UNLOGGED;
COPY questions FROM '/csv/questions.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
ALTER TABLE questions ALTER COLUMN date SET NOT NULL;
ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE questions SET LOGGED;


-- COPY CSV DATA for questions
-- ALTER TABLE questions SET UNLOGGED;
-- COPY questions FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/questions.csv' DELIMITER ',' CSV HEADER;
-- ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
-- ALTER TABLE questions ALTER COLUMN date SET NOT NULL;
-- ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE questions SET LOGGED;

-- ALTER TABLE questions SET UNLOGGED;
-- COPY questions FROM '/csv/questions.csv' DELIMITER ',' CSV HEADER;
-- ALTER TABLE questions ALTER COLUMN date TYPE timestamp with time zone USING (to_timestamp(date/1000) AT TIME ZONE 'UTC');
-- ALTER TABLE questions ALTER COLUMN date SET NOT NULL;
-- ALTER TABLE questions ALTER COLUMN date SET DEFAULT CURRENT_TIMESTAMP;
-- ALTER TABLE questions SET LOGGED;
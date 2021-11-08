CREATE TABLE IF NOT EXISTS photos (
 id SERIAL PRIMARY KEY,
 answer_id INT NOT NULL,
 url VARCHAR(255)
);

-- COPY CSV DATA FOR photos AND SET CONSTRAINTS
-- ALTER TABLE photos SET UNLOGGED;
-- COPY photos FROM '/Users/louisa/HR/HR2021/SDC/QA-Service/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;
-- ALTER TABLE photos ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id);
-- ALTER TABLE photos SET LOGGED;


ALTER TABLE photos SET UNLOGGED;
COPY photos FROM '/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;
ALTER TABLE photos ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES answers(id);
ALTER TABLE photos SET LOGGED;
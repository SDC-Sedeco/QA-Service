  INSERT INTO questions (product_id, body, asker_name, asker_email) VALUES (3, 'Test question body', 'Test question name', 'testquestion@gmail.com');


  INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES (5, 'Test answer body', 'Test answer name', 'testanswer@gmail.com') RETURNING id;


  INSERT INTO photos (answer_id, url) VALUES (10, UNNEST(ARRAY['1234', '5678']));


--CREATES TEMP TABLES ONLY FOR SESSION
  CREATE TEMPORARY TABLE questions LIKE questions;
  CREATE TEMPORARY TABLE answers LIKE answers;
  CREATE TEMPORARY TABLE photos LIKE photos;

--FOR TEST TABLE ONLY --It will delete all DATA and reset auto-increment to 0
TRUNCATE <table name> RESTART IDENTITY;

-- SYNCING
SELECT MAX(id) FROM <table name>;
SELECT setval(<table name>_<column name>_seq, (SELECT MAX(id) from questions));
BEGIN;
LOCK TABLE questions IN EXCLUSIVE MODE;
SELECT setval(<table name>_<column name>_seq, COALESCE((SELECT MAX(id) +1 FROM <table name>, 1), false);
COMMIT;


SELECT setval('questions_id_seq', MAX(id)) FROM questions;
SELECT setval('answers_id_seq', MAX(id)) FROM answers;
SELECT setval('photos_id_seq', MAX(id)) FROM photos;

--SET THE AUTO-INCREMENT TO A SPECIFIC VALUE
  ALTER SEQUENCE questions_id_seq RESTART WITH 1000;
  ALTER SEQUENCE answers_id_seq RESTART WITH 1000;
  ALTER SEQUENCE photos_id_seq RESTART WITH 1000;

--TEST TABLE

CREATE TABLE IF NOT EXISTS test_answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  reported BOOLEAN DEFAULT 'f',
  helpful INT DEFAULT 0,
  CONSTRAINT fk_question
  FOREIGN KEY (question_id)
  REFERENCES questions(id)
  ON DELETE CASCADE;
);

CREATE TABLE IF NOT EXISTS test_questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(1000) NOT NULL,
  reported BOOLEAN DEFAULT 'f',
  helpful INT DEFAULT 0
);

--last 5 records
SELECT * FROM answers ORDER BY id DESC LIMIT 5;

  --  SELECT
  --     questions.id AS question_id,
  --     questions.body AS question_body,
  --     questions.date AS question_date,
  --     questions.asker_name,
  --     questions.reported,
  --     questions.helpful AS question_helpfulness,
  --     (CASE
  --       WHEN string_agg(answers.id::varchar, '-' order by answers.id) IS NOT NULL THEN
  --         COALESCE(
  --           json_agg(
  --             json_build_object(
  --               'id', answers.id,
  --               'body', answers.body,
  --               'date', answers.date,
  --               'answerer_name', answers.answerer_name,
  --               'helpfulness', answers.helpful,
  --               'photos',
  --               COALESCE(
  --                 (
  --                   SELECT
  --                   json_agg(photos.url)
  --                   FROM photos
  --                   WHERE photos.answer_id = answers.id
  --                 ),
  --                 json_build_array()
  --               )
  --             )
  --           )
  --           FILTER
  --           (WHERE answers.reported = FALSE),
  --           json_build_array()
  --         )
  --       ELSE
  --         json_build_array()
  --       END) AS answers
  --          FROM
  --          questions
  --          LEFT JOIN
  --          answers
  --          ON
  --          questions.id = answers.question_id
  --          WHERE
  --          questions.product_id = 3
  --          AND NOT questions.reported
  --          GROUP BY questions.id
  --          LIMIT 5
  --          OFFSET 0;




  --  SELECT
  --     answers.id AS answer_id,
  --     answers.body,
  --     answers.date,
  --     answers.answerer_name,
  --     answers.helpful AS helpfulness,
  --     (CASE
  --       WHEN string_agg(photos.url, '-' order by photos.url) IS NOT NULL THEN
  --       COALESCE(
  --         json_agg(
  --           json_build_object(
  --             'id', photos.id,
  --             'url', photos.url
  --           )
  --         )
  --       )
  --       ELSE
  --       json_build_array()
  --       END) AS photos
  --       FROM answers
  --       LEFT JOIN photos
  --       ON photos.answer_id = answers.id
  --       WHERE NOT answers.reported AND answers.question_id = 1
  --       GROUP BY answers.id
  --       LIMIT 5
  --       OFFSET 0;
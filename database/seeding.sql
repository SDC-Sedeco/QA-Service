  INSERT INTO questions (product_id, body, asker_name, asker_email) VALUES (3, 'Test question body', 'Test question name', 'testquestion@gmail.com');


  INSERT INTO answers (question_id, body, answerer_name, answerer_email) VALUES (5, 'Test answer body', 'Test answer name', 'testanswer@gmail.com') RETURNING id;


  INSERT INTO photos (answer_id, url) VALUES (10, UNNEST(ARRAY['1234', '5678']));


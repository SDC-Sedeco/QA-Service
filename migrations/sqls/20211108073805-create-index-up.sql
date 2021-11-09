
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_product_id ON questions(product_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_question_id ON answers(question_id);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_answer_id ON photos(answer_id);



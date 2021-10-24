const { pool } = require('./../database/db.js')

module.exports = {

  get:({question_id}, {page = 1, count = 5}) => {
    return pool.query(
      `
      SELECT
      id,
      body,
      date,
      answerer_name,
      helpful
      //array of photos
      FROM answers
      WHERE idx_question_id = ${question_id}
      AND
      NOT reported
      LIMIT
      ${count}
      OFFSET
      ${(page - 1) * count}
    `
    )
  },

  post:({question_id}, {body, name, email}) => {
    return pool.query(
      `
      INSERT INTO answers
      (
        question_id,
        body,
        answerer_name,
        answerer_email
      )
      VALUES
      (
        ${question_id},
        ${body},
        ${name},
        ${email}
      )
      RETURNING id
      `
    )
  },

  helpful:({answer_id}) => {
    return pool.query(
      `
      UPDATE answers
      SET
      helpful = helpful + 1
      WHERE
      id = ${answer_id}`
    )
  },

  report:({answer_id}) => {
    return pool.query(
      `
      UPDATE answers
      SET
      reported = TRUE
      WHERE
      id = ${answer_id}`
    )
  }
}

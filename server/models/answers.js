const { pool } = require('./../../database/db.js')

module.exports = {

  get:({question_id}, {page = 1, count = 5}) => {
    return pool.query(
      `
      SELECT
      answers.id AS answer_id,
      answers.body,
      answers.date,
      answers.answerer_name,
      answers.helpful AS helpfulness,
      (CASE
        WHEN string_agg(photos.url, '-' order by photos.url) IS NOT NULL THEN
        COALESCE(
          json_agg(
            json_build_object(
              'id', photos.id,
              'url', photos.url
            )
          )
        )
        ELSE
        json_build_array()
        END) AS photos
        FROM answers
        LEFT JOIN photos
        ON photos.answer_id = answers.id
        WHERE NOT answers.reported AND answers.question_id = ${question_id}
        GROUP BY answers.id
          LIMIT ${count}
          OFFSET ${(page - 1) * count}`
      )
  },

  post:({question_id}, {body, name, email}) => {
    console.log(question_id, body, name, email)
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
        '${body}',
        '${name}',
        '${email}'
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
      WHERE reported = FALSE
      AND id = ${answer_id}`
    )
  }
}

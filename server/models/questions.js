const { pool } = require('./../../database/db.js')

module.exports = {
  get:({product_id, page = 1, count = 5}) => {
    console.log(product_id, page, count)
    return pool.query(
      `
      SELECT
      questions.id AS question_id,
      questions.body AS question_body,
      questions.date AS question_date,
      questions.asker_name,
      questions.reported,
      questions.helpful AS question_helpfulness,
      (CASE
        WHEN string_agg(answers.id::varchar, '-' order by answers.id) IS NOT NULL THEN
          COALESCE(
            json_agg(
              json_build_object(
                'id', answers.id,
                'body', answers.body,
                'date', answers.date,
                'answerer_name', answers.answerer_name,
                'helpfulness', answers.helpful,
                'photos',
                COALESCE(
                  (
                    SELECT
                    json_agg(photos.url)
                    FROM photos
                    WHERE photos.answer_id = answers.id
                  ),
                  json_build_array()
                )
              )
            )
            FILTER
            (WHERE answers.reported = FALSE),
            json_build_array()
          )
        ELSE
          json_build_array()
        END) AS answers
           FROM
           questions
           LEFT JOIN
           answers
           ON
           questions.id = answers.question_id
           WHERE
           questions.product_id = ${product_id}
           AND NOT questions.reported
           GROUP BY questions.id
           LIMIT ${count}
           OFFSET ${(page - 1) * count}
      `
      )
  },

  post:({body, name, email, product_id}) => {
   return pool.query(
      `
      INSERT
      INTO questions
      (
        product_id,
        body,
        asker_name,
        asker_email
      )
      VALUES
      (
        ${product_id},
        '${body}',
        '${name}',
        '${email}'
        )
      `,
    )
  },

  helpful:({question_id}) => {
    return pool.query(
      `
      UPDATE questions
      SET
      helpful = helpful + 1
      WHERE
      id = ${question_id}`
    )
  },

  report:({question_id}) => {
    return pool.query(
    `UPDATE questions
      SET
      reported = TRUE
      WHERE
      id = ${question_id}`
    )
  }
}

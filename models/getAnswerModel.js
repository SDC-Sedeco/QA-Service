const {query } = require('./../database/db.js')

const getAnswers = (question_id, count = 5, page = 0) => {
  return new Promise((reject, response) => {
    query(
      `
      WITH answersQuery AS {
        SELECT id, question_id, body, date, answerer_name, answerer_email, reported, helpful
        FROM answers
        WHERE question_id = $1 AND reported = 'f'
      ), answers_photo JOIN AS (
        SELECT * FROM answersQuery
        LEFT JOIN answers_photo
        ON answersQUERY.
      )
    }`
    )
  })
}





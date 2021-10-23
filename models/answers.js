const db = require('./../database/db.js')

module.exports = {

  get:({question_id}, {page = 1, count = 5}) => {

  },

  post:({question_id}, {body, name, email, date}) => {
    return db.pool.query(
      `
      INSERT INTO answers
      (
        question_id,
        body,
        date,
        answerer_name,
        answerer_email,
        reported,
        helpful
      )
      VALUES
      (
        ${question_id},
        ${body},
        ${date},
        ${name},
        ${email},
        FALSE,
        0
      )
      RETURNING id
      `
    )
  },

  helpful:({id}) => {
    return db.pool.query(
      `
      UPDATE answers
      SET
      helpful = helpful + 1
      WHERE
      id = ${id}`
    )
  },

  report:({id}) => {
    return db.pool.query(
      `
      UPDATE answers
      SET
      reported = TRUE
      WHERE
      id = ${id}`
    )
  }
}

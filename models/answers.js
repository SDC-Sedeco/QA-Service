const db = require('./../database/db.js')

module.exports = {

  get:({question_id}, {page = 1, count = 5}) => {

  },

  post:({question_id}, {body, name, email, date}) => {

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

const {pool} = require('./../database/db.js')

module.exports = {
  get:({product_id, page = 1, count = 5}) => {

  },

  post:({body, name, email, id, date}) => {

  },

  helpful:({id}) => {
    return pool.query(
      `
      UPDATE questions
      SET
      helpful = helpful + 1
      WHERE
      id = ${id}`
    )
  },

  report:({id}) => {
    return pool.query(
      `UPDATE
        questions
        SET
        reported = TRUE
        WHERE
        id = ${id}`
    )
  }
}
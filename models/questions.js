const db = require('./../database/db.js')

module.exports = {
  // get:({product_id, page = 1, count = 5}) => {
  //   return db.pool.query(
  //     `
  //     SELECT
  //     id,
  //     body,
  //     date,
  //     asker_name
  //     helpful`
  //   )
  // },

  post:({product_id, body, name, email, date}) => {
    return db.pool.query(
      `
      INSERT
      INTO questions
      (
        product_id,
        body,
        date,
        asker_name,
        asker_email,
        reported,
        helpful
      )
      VALUES
      (
        ${product_id},
        ${body},
        ${date},
        ${name},
        ${email},
        FALSE,
        0
      )`
    )
  },

  helpful:({id}) => {
    return db.pool.query(
      `
      UPDATE questions
      SET
      helpful = helpful + 1
      WHERE
      id = ${id}`
    )
  },

  report:({id}) => {
    return db.pool.query(
      `UPDATE questions
        SET
        reported = TRUE
        WHERE
        id = ${id}`
    )
  }
}
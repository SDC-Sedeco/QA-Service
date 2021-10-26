const { pool } = require('./../../database/db.js')

module.exports = {
  post: ({id: answer_id}, {photos}) => {
    return pool.query(
      `
      INSERT
      INTO photos
      (answer_id, url)
      VALUES
      (
        ${answer_id},
        UNNEST(ARRAY${photos})
      )
      `
    )
  }
}
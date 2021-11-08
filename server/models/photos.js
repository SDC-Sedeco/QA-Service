const { pool } = require('./../../database/db.js')

module.exports = {
  post: ({id: answer_id}, {urls}) => {
    if (process.env.NODE_ENV === 'development') {
      return pool.query(
        `
        INSERT
        INTO photos
        (answer_id, url)
        VALUES
        (
          ${answer_id},
          UNNEST(ARRAY${JSON.stringify(urls).replace(/"/g, "'")})
        )`
      )
    }
    if (process.env.NODE_ENV === 'production') {
      return pool.query(
        `
        INSERT
        INTO photos
        (answer_id, url)
        VALUES
        (
          ${answer_id},
          UNNEST(ARRAY${urls.replace(/"/g, "'")})
        )
        `
      )
    }
  }
}

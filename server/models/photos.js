const { pool } = require('./../../database/db.js')

module.exports = {
  post: ({id: answer_id}, {urls}) => {
    console.log(answer_id, urls)
    console.log(`
    INSERT
    INTO photos
    (answer_id, url)
    VALUES
    (
      ${answer_id},
      UNNEST(ARRAY${JSON.stringify(urls).replace(/"/g, "'")})
    )
    `)
    return pool.query(
      `
      INSERT
      INTO photos
      (answer_id, url)
      VALUES
      (
        ${answer_id},
        UNNEST(ARRAY${JSON.stringify(urls).replace(/"/g, "'")})
      )
      `
    )
  }
}
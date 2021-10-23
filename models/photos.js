const {query} = require('./../database/db.js')

module.exports = {
  post: ({answer_id}, {photos}) => {
    return query(
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
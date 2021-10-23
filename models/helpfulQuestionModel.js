const {query} = require('./../database/db.js')

module.exports = function updateHelpfulQuestion(answerId) {
  return query(
    `
    UPDATE questions
    SET helpful = helpful + 1
    WHERE id = $1;
    `,
    [answerId],
    (err, result) => {
      if (err) {
        return err;
      }
      return result;
    }
  )
}
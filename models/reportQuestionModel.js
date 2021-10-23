const {query} = require('./../database/db.js')

module.exports = async function updateReportQuestion(answerId) {
  return query(
    `
    UPDATE questions
    SET reported = 't'
    WHERE id=$1;
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
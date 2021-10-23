const {query} = require('./../database/db.js')

module.exports = function addAnswerModel(questionId, data) {
  if (data.photos === undefined) {
    data.photos = [];
  }
  return query (
    `
    SELECT addAnswer($1, $2, $3, $4, $5);
    `,
    [questionId, data.body, data.answerer_name, data.answerer_email, data.photos],
    (err, result) => {
      if (err) {
        return err;
      }
      return result;
    }
  )
}
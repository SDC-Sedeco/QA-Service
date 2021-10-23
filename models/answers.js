const {query} = require('./../database/db.js')

module.exports = {

  get:({question_id}, {page = 1, count = 5}) => {

  },

  post:({question_id}, {body, name, email, date}) => {

  },

  helpful:({answer_id}) => {

  },

  report:({answer_id}) => {

  }
}

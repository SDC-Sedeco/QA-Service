const pool = require('./db.js')

//GET QUESTIONS
const getQuestions = (request, response ) => {
  console.log('Get questions')
  pool.query('SELECT * FROM questions WHERE id > 0', (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results.rows);
    response.status(200).json(results.rows)
  })
}



module.exports = {
  getQuestions
}











//CREATE QUESTION

//UPDATE question?
//take care of updates in data

//identify and remove any duplicate records with transactions


//GET ANSWERS

//CREATE ANSWER


//UPDATE answer?


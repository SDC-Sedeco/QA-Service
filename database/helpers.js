const db = require('./db.js')
//take care of updates in data
//identify and remove any duplicate records with transactions

//GET QUESTIONS
const getQuestions = ({product_id, page = 1, count = 5}) =>
  db.query('SELECT * FROM questions ', (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results.rows);
    res.status(200).send(results.rows)
  })


//GET ANSWERS
const getAnswers = (req, res) => {
  console.log('Get answers')
  res.status(200).send('OK')
}

//ADD QUESTION
const addQuestion = (req, res) => {
  console.log('Added question')
  res.status(201).send('CREATED')
}

//ADD ANSWER
const addAnswer = (req, res) => {
  console.log('Added answer')
  res.status(201).send('CREATED')
}

//MARK QUESTION HELPFUL
const markQuestion = (req, res) => {
  console.log('Marked question helpful')
  res.status(204).send('NO CONTENT')
}

//REPORT QUESTION
const reportQuestion = (req, res) => {
  console.log('Reported question')
  res.status(204).send('NO CONTENT')
}

//MARK ANSWER HELPFUL
const markAnswer = (req, res) => {
  console.log('Marked answer helpful')
  res.status(204).send('NO CONTENT')
}

//REPORT ANSWER
const reportAnswer = (req, res) => {
  console.log('Reported answer')
  res.status(204).send('NO CONTENT')
}


module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  markQuestion,
  reportQuestion,
  markAnswer,
  reportAnswer
}









const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test',
{useNewUrlParser: true, useUnifiedTopology: true}).
catch(error => console.log(error))

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const Schema = mongoose.Schema

const questionSchema = new Schema({
  'id': Number,
  'question_body': String,
  'question_date': String,
  'asker_name': String,
  'asker_email': String,
  'question_helpfulness': Number,
  'reported': Boolean
})

const answerSchema = new Schema({
  'id': Number,
  'body': String,
  'date': String,
  'answerer_name': String,
  'answerer_email': String,
  'helpfulness': Number,
  'photos': [String],
  'reported': Boolean
})

const QuestionModel = mongoose.model('QuestionModel', questionSchema)
const AnswerModel = mongoose.model('AnswerModel', answerSchema)

export default {
  QuestionModel,
  AnswerModel
}
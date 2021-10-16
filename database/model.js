const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test',
{useNewUrlParser: true, useUnifiedTopology: true}).
catch(error => console.log(error))
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
const Schema = mongoose.Schema

//Parent
const questionSchema = new Schema({
  'question_id': Number,
  'product_id': Number,
  'question_body': {
    type: String,
    required: true,
    maxlength: 1000
  },
  'question_date': {
    type: Date,
    default: Date.now
  },
  'asker_name': {
    type: String,
    required: true,
    maxlength: 60
  },
  'asker_email': {
    type: String,
    required: true,
    maxlength: 60
  },
  'question_helpfulness': Number,
  'reported': {
    type: Boolean,
    default: false
  },
  'answers': {
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }
})

//Child of Questions - Parent referencing
const answerSchema = new Schema({
  'answer_id': Number,
  'body': {
    type: String,
    required: true,
    maxlength: 1000
  },
  'date': {
    type: Date,
    default: Date.now
  },
  'answerer_name': {
    type: String,
    required: true,
    maxlength: 60
  },
  'answerer_email': {
    type: String,
    required: true,
    maxlength: 60
  },
  'helpfulness': Number,
  'photos': [
    {
      'id':Number,
      'url': String
    }
  ],
  'reported': {
    type: Boolean,
    default: false
  }
})

/**
 * Entity Relationships
 * One question has many answers
 * An answer will belong to a specific question
 */

const Question = mongoose.model('QuestionModel', questionSchema)
const Answer = mongoose.model('AnswerModel', answerSchema)

module.exports = {
  Question,
  Answer
}
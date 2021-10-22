const express = require('express')
const router = express.Router()
const helpers = require('./database/helpers.js')

router.get('/', (req, res) => {
  res.status(200).send('Working')
})

//GET /qa/questions
router.get('/qa/questions')

//GET /qa/questions/:question_id/answers
router.get('/qa/questions:question_id/answers')

//POST /qa/questions
router.post('/qa/questions')

//POST /qa/questions/:question_id/answers
router.post('/qa/questions/:question_id/answers')

//PUT /qa/questions/:question_id/helpful
router.put('/qa/questions/:question_id/helpful')

//PUT /qa/questions/:question_id/report
router.put('/qa/questions/:question_id/report')

//PUT /qa/answers/:answer_id/helpful
router.put('/qa/answers/:answer_id/helpful')

//PUT /qa/answers/:answer_id/report
router.put('/qa/answers/:answer_id/report')


module.exports = router;
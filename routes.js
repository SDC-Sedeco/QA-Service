const express = require('express')
const router = express.Router()
const helper = require('./database/helpers.js')

router.get('/', (req, res) => {
  res.status(200).send('Working')
});


router.get('/qa/questions', helper.getQuestions);


router.get('/qa/questions:question_id/answers', helper.getAnswers);


router.post('/qa/questions', helper.addQuestion);


router.post('/qa/questions/:question_id/answers', helper.addAnswer);


router.put('/qa/questions/:question_id/helpful', helper.markQuestion);


router.put('/qa/questions/:question_id/report', helper.reportQuestion);


router.put('/qa/answers/:answer_id/helpful', helper.markAnswer);


router.put('/qa/answers/:answer_id/report', helper.reportAnswer);


module.exports = router;
const express = require('express')
const router = express.Router()
const controller = require('./controllers');

router.get('/', (req, res) => {
  res.status(200).send('Working')
});


router.get('/qa/questions');


router.get('/qa/questions:question_id/answers');


router.post('/qa/questions', controller.questions.post);


router.post('/qa/questions/:question_id/answers', controller.answers.post);


router.put('/qa/questions/:question_id/helpful', controller.questions.helpful);


router.put('/qa/questions/:question_id/report', controller.questions.report);


router.put('/qa/answers/:answer_id/helpful', controller.answers.helpful);


router.put('/qa/answers/:answer_id/report', controller.answers.report);


module.exports = router;
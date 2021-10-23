const addAnswerModel = require('../models/addAnswerModel');

module.exports = async function addAnswer(req, res) {
  try {
    let data = {
      body: req.body.body,
      answerer_name: req.body.answerer_name,
      answerer_email: req.body.answerer_email,
      photos: req.body.photos
    };

    let updated = await addAnswerModel(req.params.question_id, data)
    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err)
  }
}
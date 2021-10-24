const models = require('../models')

module.exports = {
  get: (req, res) => {
    models.questions.get(req.query)
    .then(questions => console.log('questions', questions))
    .catch((err) => res.status(500).send(err))
  },

  post: (req, res) => {
    console.log(typeof req.body.product_id)
    models.questions.post(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err))
  },

  helpful: (req, res) => {
    models.questions.helpful(req.params)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err))
  },


  report: (req, res) => {
    models.questions.report(req.params)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err))
  }
}
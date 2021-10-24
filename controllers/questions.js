const models = require('../models')

module.exports = {
  get: (req, res) => {
    models.questions.get(req.query)
    .then(questions => console.log('questions', questions))
    .catch((err) => res.status(500).send(err))
  },

  post: (req, res) => {
    models.questions.post(req.params)
    .then(response => res.status(201).json(response))
    .catch((err) => res.status(500).send(err))
  },

  helpful: (req, res) => {
    models.questions.helpful(req.params)
    .then(() => res.status(204).send('No Content'))
    .catch((err) => res.status(500).send(err))
  },


  report: (req, res) => {
    models.questions.report(req.params)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err))
  }
}
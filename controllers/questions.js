const models = require('../models')

module.exports = {
  // get: (req, res) => {

  // },

  post: (req, res) => {
    models.questions.post(req.query)
    .then(() => res.status(201).send('Created'))
    .catch((err) => res.status(400).send(err))
  },

  helpful: (req, res) => {
    models.questions.helpful(req.params)
    .then(() => res.status(204).send('No Content'))
    .catch((err) => res.status(500).send(err))
  },

  report: (req, res) => {
    models.questions.report(req.params)
    .then(() => res.status(204).send('No Content'))
    .catch((err) => res.status(500).send(err))
  }
}
const models = require('../models')

module.exports ={
  get: (req, res) => {

  },

  post: (req, res) => {

  },

  helpful: (req, res) => {
    models.answers.helpful(req.params)
    .then(() => res.status(204).send('No Content'))
    .catch((err) => res.status(500).send(err))
  },

  report: (req, res) => {
    models.answers.report(req.params)
    .then(() => res.status(204).send('No Content'))
    .catch((err) => res.status(500).send(err))
  }
}
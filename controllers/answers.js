const models = require('../models')

module.exports ={
  get: (req, res) => {
    console.log('?')
  },

  post: (req, res) => {
    models.answers.post(req.params, req.query)
    .then(({rows}) => models.photos.post(rows[0], req.query))
    .then(() => res.status(201).send('Created'))
    .catch((err) => res.status(400).send(err))
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
const models = require('../models')

module.exports ={
  get: (req, res) => {
    models.answers.get(req.params, req.query)
    .then(({rows}) => {
      // rows.length === 0 ? res.sendStatus(500)
      res.status(200).send(
        {
        'question': req.params.question_id,
        'page': req.query.page|| 1,
        'count': req.query.page || 5,
        'results': rows
      })
    }).catch((err) => res.status(500).send(err))
  },

  helpful: (req, res) => {
    models.answers.helpful(req.params)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err))
  },

  report: (req, res) => {
    console.log('params', req.params)
    models.answers.report(req.params)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err))
  }
}
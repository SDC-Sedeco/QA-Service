const models = require('../models')

module.exports = {
  get: (req, res) => {
    // console.log('GET POSTED QUESTION', req.query.product_id, req.query.page, req.query.count)
    models.questions.get(req.query)
    .then(({rows}) => {

      for (let i = 0; i < rows.length; i++) {
        // console.log('Question id 3', rows[i].question_id, rows[i].question_body, rows[i].reported)
        console.log('helpful', rows[i].question_helpfulness)
        let answerArr = rows[i].answers

        let answerObject = answerArr.reduce((answerObj, data) => {
         answerObj[data.id] = data
        return answerObj}, {} )

        rows[i].answers = answerObject
      }
      rows.length === 0 ? res.sendStatus(500)
      : res.status(200).send(
        {
        'product_id': req.query.product_id,
        'results': rows
      })
    })
    .catch((err) => res.status(500).send(err))
  },

  post: (req, res) => {
    const {product_id, name, email, body} = req.body;
    // console.log('Was the Question Posted', product_id, name, email, body)
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
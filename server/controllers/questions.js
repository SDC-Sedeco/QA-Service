const models = require('../models')
const redis = require('redis')
const redisCache = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});


async function connectRedis()  {
  await redisCache.connect()
  redisCache.on("error", function(error) {
    console.error(error);
  });
  await redisCache.set("test", "connectRedisTest", redis.print);
  const test = await redisCache.get("test", redis.print);
  console.log(test)
}
connectRedis()

module.exports = {
  get: async (req, res) => {
    const {product_id } = req.query

    const value = await redisCache.get(`product_id-${product_id}`)
    // const value = await redisCache.del(`product_id-${product_id}`)

    if(value) {
      const data = JSON.parse(value)
      res.status(302).send({
        product_id,
        results: data
      })
      return
    }

    models.questions.get(req.query)
    .then(async ({rows}) => {

      for (let i = 0; i < rows.length; i++) {
        let answerArr = rows[i].answers

        let answerObject = answerArr.reduce((answerObj, data) => {
         answerObj[data.id] = data
        return answerObj}, {} )

        rows[i].answers = answerObject
      }

      // cache response
      try {
        await redisCache.set(`product_id-${product_id}`, JSON.stringify({
          'product_id': req.query.product_id,
          'results': rows
        }), {
          EX: 60,
          NX: true
        })
      } catch(err) {
        console.log(err)
      }


      res.status(200).send(
        {
        'product_id': req.query.product_id,
        'results': rows
      })
    })
    .catch((err) => res.status(500).send(err))
  },

  post: (req, res) => {
    const {product_id, name, email, body} = req.body;
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
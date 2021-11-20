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

module.exports ={
  get: async (req, res) => {
    const {question_id} = req.params

    const cachedResponse = await redisCache.get(`question_id-${question_id}`)

    if (cachedResponse) {
      res.status(302).send(JSON.parse(cachedResponse))
      return
    }

    models.answers.get(req.params, req.query)
    .then(async ({rows}) => {

      const data =  {
        'question': req.params.question_id,
        'page': req.query.page|| 1,
        'count': req.query.page || 5,
        'results': rows
      }

      try {
        await redisCache.set(`question_id-${question_id}`, JSON.stringify(data), {
          EX: 60,
          NX: true
        })
      } catch(err) {
        console.log(err)
      }


      res.status(200).send(data)
    }).catch((err) => res.status(500).send(err))
  },

  post: (req, res) => {
    const {body, name, email} = req.body
    models.answers.post(req.params, req.body)
    .then(({rows}) => models.photos.post(rows[0], req.body))
    .then(() => res.sendStatus(201))
    .catch((err) => res.status(500).send(err))
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
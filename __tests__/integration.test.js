const request = require('supertest')
const app = require('../server/app')
/**
 * Ensures parts of system works together
 * Involves communication (e.g network, db)
 * Might use stubs
DO Test: API Permissions & DB, stubbing, things to check everytime something changes and restarts
DON'T Test: HTTP Requests (Whoops), see if you can fetch data models for ORMs
**/


//QUESTIONS TESTS//
describe('GET /test', () => {
  test('Responds with expected JSON', async () => {
    const response = await request(app).get('/api/qa/test').send('Working')
       expect(response.statusCode).toBe(200)
       expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
  })

  describe('GET /qa/questions', () => {
    test('Responds with JSON of all questions for current product', async () => {
      const response = await request(app).get('/api/qa/questions?product_id=1&page=1&count=5')
      expect(response.statusCode).toBe(200)
      expect(response.body).toStrictEqual(response.body)
  })
  test('Returns an internal server error if product id does not exist', async () => {
    const response = await request(app).get('/api/qa/questions?product_id=4000000&page=1&count=5')
    expect(response.statusCode).toBe(500)
  })
})


describe('POST /qa/questions', () => {
  test('GET the post for /qa/questions', async () => {
    const response = await request(app)
    .post('/api/qa/questions')
    .send({
      body: "Is this made of bacon?",
      name: "Baconlover",
      email: "iluvbacon@gmail.com",
      product_id: 3
    })
    expect(response.statusCode).toBe(201)
  })


  test('should be json in content type header', async () => {
    const response = await request(app)
    .post('/api/qa/questions').send({
      body: "Is this made of bacon?",
      name: "Baconlover",
      email: "iluvbacon@gmail.com"
    })
    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
  })
})

describe('PUT /questions/:question_id/helpful', () => {
  test('Should return a 204', async () => {
    const response = await request(app)
    .put('/api/qa/questions/1/helpful')
    expect(response.statusCode).toBe(204)
  })
})

describe('PUT /questions/:question_id/report', () => {
  test('Should return a 204', async () => {
    const response = await request(app)
    .put('/api/qa/questions/5/report')
    expect(response.statusCode).toBe(204)
  })
})


//ANSWERS TESTS//
describe('GET /qa/questions/:question_id/answers', () => {
  test('Responds with all JSON answers for current product', async () => {
    const response = await request(app).get('/api/qa/questions/5/answers')
    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(response.body)
  })
  test('Returns an internal server error if product id does not exist', async () => {
    const response = await request(app).get('/api/qa/questions/500/answers')
    expect(response.statusCode).toBe(500)
  })
})


  describe('POST qa/questions/:question_id/answers', () => {
    test('GET the post for /qa/questions/:questions_id/answers', async () => {
      const response = await request(app)
      .post('/api/qa/questions/1/answers')
      .send({
        body: "Is this made of bacon?",
        name: "Baconlover",
        email: "iluvbacon@gmail.com",
        photos: "['wow']"
      })
      expect(response.statusCode).toBe(201)
    })

    test('Returns an internal server error if question id does not exist', async () => {
      const response = await request(app).get('/api/qa/questions/500/answers')
      expect(response.statusCode).toBe(500)
    })
  })

  describe('PUT /answers/:answer_id/helpful', () => {
    test('Should return a 204', async () => {
      const response = await request(app)
      .put('/api/qa/answers/1/helpful')
      expect(response.statusCode).toBe(204)
    })
  })

  describe('PUT /answers/:answer_id/report', () => {
    test('Should return a 204', async () => {
      const response = await request(app)
      .put('/api/qa/answers/5/report')
      expect(response.statusCode).toBe(204)
    })
  })






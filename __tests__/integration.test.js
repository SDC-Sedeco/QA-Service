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
      expect(response.body).toStrictEqual(
        {
        "product_id": "1",
        "results": [
            {
                "question_id": 3,
                "question_body": "Does this product run big or small?",
                "question_date": "2020-12-21T15:31:47.000Z",
                "asker_name": "jbilas",
                "reported": false,
                "question_helpfulness": 8,
                "answers": {}
            },
            {
                "question_id": 4,
                "question_body": "How long does it last?",
                "question_date": "2020-07-10T07:35:17.000Z",
                "asker_name": "funnygirl",
                "reported": false,
                "question_helpfulness": 6,
                "answers": {
                    "65": {
                        "id": 65,
                        "body": "It runs small",
                        "date": "2020-11-19T11:11:47-08:00",
                        "answerer_name": "dschulman",
                        "helpfulness": 1,
                        "photos": [
                            "https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
                            "https://images.unsplash.com/photo-1536922645426-5d658ab49b81?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                        ]
                    },
                    "89": {
                        "id": 89,
                        "body": "Showing no wear after a few months!",
                        "date": "2020-09-02T23:33:29-07:00",
                        "answerer_name": "sillyguy",
                        "helpfulness": 8,
                        "photos": []
                    }
                }
            },
            {
                "question_id": 3518966,
                "question_body": "Hi, I like apples",
                "question_date": "2021-10-24T20:12:18.731Z",
                "asker_name": "Mango",
                "reported": false,
                "question_helpfulness": 0,
                "answers": {}
            },
            {
              "question_id": 3519055,
              "question_body": "Waffles",
              "question_date": "2021-10-29T22:18:35.966Z",
              "asker_name": "Apple",
              "reported": false,
              "question_helpfulness": 0,
              "answers": {}
          }
        ]
      }
    )
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
    expect(response.body).toStrictEqual(
      {
        "question": "5",
        "page": 1,
        "count": 5,
        "results": [
            {
                "answer_id": 46,
                "body": "I've thrown it in the wash and it seems fine",
                "date": "2020-11-22T13:27:23.000Z",
                "answerer_name": "marcanthony",
                "helpfulness": 8,
                "photos": []
            },
            {
                "answer_id": 64,
                "body": "It says not to",
                "date": "2020-05-05T09:15:50.000Z",
                "answerer_name": "ceasar",
                "helpfulness": 0,
                "photos": []
            },
            {
                "answer_id": 96,
                "body": "I wouldn't machine wash it",
                "date": "2020-05-27T20:03:41.000Z",
                "answerer_name": "ceasar",
                "helpfulness": 0,
                "photos": []
            },
            {
                "answer_id": 101,
                "body": "Only if you want to ruin it!",
                "date": "2020-05-27T20:03:41.000Z",
                "answerer_name": "ceasar",
                "helpfulness": 5,
                "photos": []
            },
            {
                "answer_id": 107,
                "body": "Yes",
                "date": "2021-01-13T16:47:26.000Z",
                "answerer_name": "Seller",
                "helpfulness": 4,
                "photos": []
            }
         ]
      }
    )
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






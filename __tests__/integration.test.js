const request = require('supertest')
const app = require('../server/app')



describe('GET /test', () => {
  test('Responds with expected JSON', async () => {
    const response = await request(app).get('/api/qa/test').send('Working')
       expect(response.statusCode).toBe(200)
    })

    test('Should return a 404 status code since API does not exist', async () => {
      const response = await request(app).get('/test')
      expect(response.statusCode).toBe(404)
    })
  })

  describe('GET /qa/questions', () => {
    test('Responds with expected JSON', async () => {
      const response = await request(app).get('/api/qa/questions?product_id=1&page=1&count=5')
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
            }
        ]
      }//end of JSON
    )
  })
})


describe('Post Endpoint', () => {
  it('should create a new post', async () => {
    const res = await request(app)
    .post('/api/qa/questions')
    .send({
      "body": "bacon",
      "name": "bacon",
      "email": "bacon@gmail.com"
    })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
  })
})


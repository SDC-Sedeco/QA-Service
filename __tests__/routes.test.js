const request = require('supertest')
const app = require('../server/app')



describe('GET /test', () => {
  test('Responds with expected JSON', done => {
    request(app)
    .get('/api/qa/test')
     .then(response => {
       expect(response.statusCode).toBe(200)
       done()
     })
    })
  })

  // describe("GET /questions", () => {
  //   it ("Responds with expected JSON", (done) => {
  //     request(app)
  //     .get('/api/qa/questions')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, done);
  //   })
  // })

// describe('Post Endpoint', () => {
//   it('should create a new post', async () => {
//     const res = await request(server)
//     .post('/api/qa/questions')
//     .send({
//       "body": "bacon",
//       "name": "bacon",
//       "email": "bacon@gmail.com"
//     })
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toHavePropety('post')
//   })
// })


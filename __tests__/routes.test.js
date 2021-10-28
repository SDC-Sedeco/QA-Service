const request = require('supertest')
const server = require('../server/index.js')


// describe('Post Endpoint', () => {
//   it('should create a new post', async () => {
//     const res = await request(app)
//     .post('/qa/questions')
//     .send({
//       "body": "bacon",
//       "name": "bacon",
//       "email": "bacon@gmail.com"
//     })
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toHavePropety('post')
//   })
// })

describe('TEST', function() {
  it("Says 'Hi' is 'Working'", function(done) {
    request(server)
    .get('/test')
    .expect('Content-Type', /json/)
    .expect(200, {
      Hi: 'Working'
    }, done)
  })
})
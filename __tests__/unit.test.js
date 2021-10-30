const controllers = require('./../server/controllers')
const models = require('./../server/models')
/**
 * Test only one thing at a time and focuses on single method or class
 * Tests do not communicate across network
 * Tests do not touch the db
 * Controller functions, custom models, Seeding functions, helper functions
 */


//QUESTIONS//
describe('Questions Controllers and Models', () => {
  test('Questions Get function should return correct data for question 3 for product_id 1', async () => {
    const response = await models.questions.get({product_id: 1})
      try {
          for (let i = 0; i < response.length; i++) {
            expect(typeof response[i].question_id).toBe("number")
            expect(typeof response[i].question_body).toBe("string")
            expect(response[i].question_date instanceof DATE).toBe(true)
            expect(typeof response[i].asker_name).toBe("string")
            expect(typeof response[i].reported).toBe("boolean")
            expect(typeof response[i].question_helpfulness).toBe("number")
          }
        } catch (err) {
          expect(err).toBeNull()
      }
  })

  test('Questions Post function should POST', async () => {
    const response = await models.questions.post({
      body: "Waffles",
      name: "Apple",
      email: "apple@gmail.com",
      product_id: 1
    })
    for (let i = 0; i < response.length; i++) {
      expect(response[i]).toBe({
        body: "Waffles",
        name: "Apple",
        email: "apple@gmail.com",
        product_id: 1
      })
    }
  })

  test('Questions PUT function should report', async () => {
    const response = await models.questions.report({question_id: 5})
    expect(response).toBeTruthy()
  })

  test('Questions PUT function should increment helpful by 1', async () => {
    const response = await models.questions.helpful({question_id:  3519100})
    expect(response).toBeTruthy()
  })
})


//ANSWERS//
describe('Answers Controllers and Models', () => {
  test('Answers Get function should return correct data types', async () => {
    const response = await models.answers.get({question_id: 1}, {page: 1, count: 5})
      try {
          for (let i = 0; i < response.length; i++) {
            expect(typeof response[i].answer_id).toBe("number")
            expect(typeof response[i].body).toBe("string")
            expect(typeof response[i].date).toBe("string")
            expect(response[i].date instanceof Date).toBe(true)
            expect(typeof response[i].answerer_name).toBe("string")
            expect(typeof response[i].helpfulness).toBe("number")
            expect(Array.isArray(response[i].photos)).toBe(true)
          }
        } catch (err) {
          expect(err).toBeNull()
      }
  })

  test('Answers Post function should POST', async () => {
    const response = await models.answers.post({question_id: 1},
      {body: "These shoes fit true to size",
      name: "Blinx",
      email: "Fisheater@gmail.com",
      photos: "['wow so cool']"
    })

    for (let i = 0; i < response.length; i++) {
      expect(response[i]).toBe({
        body: "These shoes fit true to size",
        name: "Blinx",
        email: "Fisheater@gmail.com",
        photos: "['wow so cool']"
      })
    }
  })

  //should not show up in list -- problem with the next answer_id with undefined showing up
  test('Answers PUT function should report', async () => {
    const response = await models.answers.report({answer_id: 6879316})
    expect(response).toBeTruthy()
  })

  //use can only vote once
  test('Answers PUT function should increment helpful by 1', async () => {
    const response = await models.answers.helpful({answer_id: 7})
    expect(response).toBeTruthy()
  })
})
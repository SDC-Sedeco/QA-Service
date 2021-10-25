const { Pool } = require('pg')
const { client } = require('./../database/db.js')

describe('route', function () {
  let app; //eslint-disable-line
  before('mock connection', async function () { //eslint-disable-line
    const pool = new Pool({
      host: 'testpostgres',
      user: 'testuser',
      pw: '',
      db: 'test',
      port: 5432,
      pool: {
        max: 1,
        idleTimeoutMillis: 0
      }
    })
  client.query = (text, values) => {
    return pool.query(text, values)
  }

  app = require('./../server/index.js')
})

 beforeEach('Create temp table', async function () {
   await client.query('CREATE TEMPORARY TABLE questions (LIKE questions INCLUDING ALL)')
 })

 afterEach('Drop temporary tables', async function () {
   await client.query('DROP TABLE IF EXISTS pg_temp.questions')
 })

describe('POST /qa/questions', function () {
  it('Should create a question')
})



})

const {Pool} = require('pg')
require('dotenv').config()

const config = {
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  pw: process.env.PGPASSWORD,
  db: process.env.PGDATABASE,
  port: process.env.PGPORT,
  pool: {
    max: 25,
    min: 0,
    idleTimeoutMillis: 3000
  }
}


const pool = new Pool(config);


module.exports = {
  query: (text, params, callback) => pool.connect((err, client, done) => {
    if (err) {
      return console.error('Error getting client', err.stack)
    }
    client.query(text, params, (err, result) => {
      done();
      callback(err, result);
    })
  })

}

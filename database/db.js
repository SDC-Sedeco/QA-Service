const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
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
})

pool.connect()

let query = `SELECT * FROM answers ORDER BY id DESC LIMIT 5`

pool.query(query, (err, res) => {
  if (!err) {
    console.log(res.rows)
  } else {
    console.log(err.message)
  }
  pool.end
})


module.exports.pool = pool;




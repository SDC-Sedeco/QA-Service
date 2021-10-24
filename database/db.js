const { Pool } = require('pg')
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


exports.pool = new Pool(config);




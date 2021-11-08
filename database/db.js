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
    idleTimeoutMillis: 1000
  }
})

const query = `SELECT * FROM answers ORDER BY id DESC LIMIT 3`;

pool.connect()
.then((client) => {
  client.query(query)
    .then(res => {
      for (let row of res.rows) {
        console.log(row)
      }
    })
    .catch(err => {
      console.error('error running query', err);
    });
  })
  .catch(err => {
    console.error('could not connect to postgres', err);
});


module.exports.pool = pool;




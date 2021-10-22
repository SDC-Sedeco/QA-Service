const {Pool} = require('pg')
const config = require('./../config.json')

const host = config.host
const user = config.user
const pw = config.pw
const db = config.db
const port = config.port
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`

const pool = new Pool({
  connectionString: conString,
});

pool.connect((err) => {
  if (err) throw err;
  console.log(`Database connected on port ${port}`);
});

module.exports = pool;
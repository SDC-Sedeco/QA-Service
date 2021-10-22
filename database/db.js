const {Pool} = require('pg')
const config = require('./../config.json')


//Get connection parameters
const host = config.host
const user = config.user
const pw = config.pw
const db = config.db
const port = config.port
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`

//Connect to DB
const pool = new Pool({
  connectionString: conString,
});

//Error handling
pool.connect((err) => {
  if (err) throw err;
  console.log(`Database connected on port ${port}`);
});


module.exports = pool;
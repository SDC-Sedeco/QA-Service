const {Pool} = require('pg')
const dotenv = require('dotenv')

dotenv.config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const port = process.env.DB_PORT;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const conString = `postgres://${user}:${password}@${host}:${port}/${database}`


//Connect to DB
const pool = new Pool({
  connectionString: conString
});


pool.on('connect', () => {
  console.log(`Database has connected successfully!`)
});

//text will be query, and params will be dynamic elements
module.exports = {
  query: (text, params) => pool.query(text, params)
};

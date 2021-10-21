const fs = require('fs')
const {Pool} = require('pg')
const copyFrom = require('pg-copy-streams').from
const config = require('./../config.json')

//inputfile
// const table = 'questions'

//Get connection parameters
const host = config.host
const user = config.user
const password = config.password
const database = config.database
const port = config.port
const conString = `postgres://${user}:${password}@${host}:${port}/${database}`

//Connect to DB
const pool = new Pool({
  connectionString: conString,
});

// const query =`
// SELECT * FROM answers WHERE answers.question_id = 1;
// `
//   (async () => {
//     try {
//       const client = await pool.connect();
//       const res = await client.query(query);
//       for (let row of res.rows) {
//         console.log(row);
//       }
//     }
//     catch(err) {
//       console.error(err);
//     }
//   })();



  // let stream = pool.query(copyFrom(`COPY questions FROM DELIMITER ',' CSV HEADER STDIN`))
  // let fileStream = fs.createReadStream('/Users/louisa/questions.csv')

  // fileStream.on('error', (error) => {
  //   console.log(`Error in reading file: ${error}`)
  // })
  // stream.on('error', (error) => {
  //   console.log(`Error in copy command: ${error}`)
  // })
  // stream.on('end', () => {
  //   console.log(`Completed loading data into table`)
  // })
  // fileStream.pipe(stream)






module.exports = pool;
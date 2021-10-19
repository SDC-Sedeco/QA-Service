const fs = require('fs')
const path = require('path')
const {Pool} = require('pg')
const config = require('./../config.json')


//Get connection parameters
const host = config.host
const user = config.user
const password = config.password
const database = config.database
const port = config.port
const conString = `postgres://${user}:${password}@${host}:${port}/${database}`

//Connect to DB
const db = new Pool({
  connectionString: conString,
});

db.connect(function(err) {
  if (err) throw err;
  console.log(`Database connected to ${port}!`)
});

module.exports = db;
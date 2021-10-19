const fs = require('fs')
const path = require('path')
const {Client} = require('pg')
const config = require('./../config.json')


//Get connection parameters
const host = config.host
const user = config.user
const pw = config.pw
const db = config.db
const port = config.port
const conString = `postgres://${user}:${pw}@${host}:${port}/${db}`

//Connect to DB
const client = new Client({
  connectionString: conString,
})
client.connect(function(err) {
  if (err) throw err;
  console.log('Connected!')
});
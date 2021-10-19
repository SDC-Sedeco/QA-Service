const express = require('express')
const db = require('../database/db.js')
const cors = require('cors')

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.send('Hello')
})




app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

const express = require('express')
const router = require('./../routes.js')
const cors = require('cors')

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', router);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});

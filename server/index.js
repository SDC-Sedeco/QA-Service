const express = require('express')
const cors = require('cors')

const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
  res.send('Hello')
})

//VIEW

//ROUTES//

//GET /qa/questions

//GET /qa/questions/:question_id/answers


//POST /qa/questions

//POST /qa/questions/:question_id/answers

//PUT /qa/questions/:question_id/helpful

//PUT /qa/questions/:question_id/report

//PUT /qa/answers/:answer_id/helpful

//PUT /qa/answers/:answer_id/report



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})

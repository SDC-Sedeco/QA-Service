const express = require('express')
const cors = require('cors')
const router = require('./../routes.js')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT || 8080

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/qa', router)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});



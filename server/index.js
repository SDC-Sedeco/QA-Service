const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./routes.js')
const logger = require('morgan')

const app = express()
const PORT = process.env.PORT || 8080

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/qa', router)
app.use(cors())

//Absolute Path: /Users/louisa/HR/HR2021/SDC/Atelier/client/dist/bundle.js
const staticAssets = path.resolve(__dirname.substring(0, __dirname.length - 17), 'Atelier/client/dist')
console.log(staticAssets + '/index.html')
app.use(express.static(staticAssets));

//Absolute Path: /Users/louisa/HR/HR2021/SDC/Atelier/client/dist/index.html
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(staticAssets + '/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});



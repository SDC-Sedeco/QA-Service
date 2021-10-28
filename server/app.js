const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./routes.js')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/qa', router)
app.use(cors())


const staticAssets = path.resolve(__dirname.substring(0, __dirname.length - 17), 'Atelier/client/dist')

app.use(express.static(staticAssets));


console.log(`Serving ${staticAssets}/index.html` )

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${staticAssets}/index.html`));
});


module.exports = app;


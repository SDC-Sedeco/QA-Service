const app = require('./app')
const PORT = process.env.PORT
const SERVER_ID = process.env.SERVER_ID

if (process.env.NODE_ENV === 'production') {
  PORT = 80
}

app.get("/", (req, res) => {
  res.send({server: SERVER_ID, port: PORT})
})

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});

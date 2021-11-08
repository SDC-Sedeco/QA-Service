const fs = require('fs')
const path = require('path')
const express = require('express')
const cors = require('cors')
const router = require('./routes.js')
const logger = require('morgan')
const models = require('./models')
const multer = require('multer')
const AWS = require('aws-sdk')
// console.log(process.env.NODE_ENV)


const app = express()


const staticAssets = path.resolve(__dirname.substring(0, __dirname.length - 17), 'Atelier/client/dist')
app.use(express.static(staticAssets))


const PHOTO_UPLOAD_FOLDER = path.join(__dirname.substring(0, __dirname.length - 17), 'Atelier/client/UploadedPhotos');
app.use(express.static(PHOTO_UPLOAD_FOLDER))

//Store photos to file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PHOTO_UPLOAD_FOLDER);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.use('/api/qa', router)


if (process.env.NODE_ENV === 'production') {

  app.post('/api/qa/questions/:question_id/answers', upload.array('photos', 5), (req, res) => {

    const files = req.files;


    for (let [i, photo] of files.entries()) {
      fs.readFile(photo.path, (err, data) => {

        if (err) {
          res.status(500).send(err);
        } else {

          if (process.env.NODE_ENV === 'production') {

            AWS.config.update({
              accessKeyId: process.env.AWS_ACCESS_KEY,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
              region: process.env.REGION,
              signatureVersion: 'v4'
            })

            const s3 = new AWS.S3()

            const params = {
              Bucket: process.env.Bucket,
              Key: photo.originalname,
              Body: data
            }

            s3.upload(params, (err, data) => {
              if (err) {
                res.status(500).send('Unable to upload to S3')
              } else {
                  if (i === files.length - 1) {
                    models.answers.post(req.params, req.body)
                    .then(({rows}) => models.photos.post(rows[0], req.body))
                    .then(() => res.status(201).send('CREATED'))
                    .catch((err) => res.status(400).send(err))
                }
              }
            })
          } else if (process.env.NODE_ENV === 'development') {

              if (i === files.length - 1) {
                models.answers.post(req.params, req.body)
                .then(({rows}) => models.photos.post(rows[0], req.body))
                .then(() => res.status(201).send('CREATED'))
                .catch((err) => res.status(400).send(err))
              }
            }
          } //development mode
      })
    }
  })
}



// app.get('/loaderio-331f6abcab82fd056c9b4d0516047478/', (req, res) => {
//   res.status(200).send(`loaderio-331f6abcab82fd056c9b4d0516047478`);
// })

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${staticAssets}/index.html`));
});


module.exports = app;


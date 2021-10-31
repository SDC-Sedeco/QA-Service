const express = require('express')
const path = require('path')
const cors = require('cors')
const router = require('./routes.js')
const logger = require('morgan')
const models = require('./models')
const fs = require('fs')
const multer = require('multer')

const app = express()

const PHOTO_UPLOAD_FOLDER = path.join('/Users/louisa/HR/HR2021/SDC/Atelier', '/client/UploadedPhotos');

app.use(express.static(PHOTO_UPLOAD_FOLDER));
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

app.post('/api/qa/questions/:question_id/answers', upload.array('photos', 5), (req, res) => {
  console.log('req.headers', req.headers);
  console.log('req.files', req.files);
  console.log('body', req.body);

  for (let [i, photo] of req.files.entries()) {
    fs.readFile(photo.path, (err, data) => {
      if (err) {
        res.status(500).send('Error happened while uploading to S3');
      }
      else {

        // const params = {
        //   Bucket: 'fec-atelier-photo-bucket',
        //   Key: photo.originalname,
        //   Body: data
        // };
        // s3.upload(params, (err, data) => {
        //   if (err) {
        //     res.status(500).send('Error happened while uploading to S3');
        //   } else {
        //     if (i === req.files.length - 1) {
          models.answers.post(req.params, req.body)
          .then(({rows}) => models.photos.post(rows[0], req.body))
          .then((result) => res.status(201).send(result))
          .catch((err) => res.status(400).send(err))
        //       res.status(201).send('Successully uploaded all photos to S3');
        //     }
        //   }
        // });
      }
    })
  }

})

const staticAssets = path.resolve(__dirname.substring(0, __dirname.length - 17), 'Atelier/client/dist')

app.use(express.static(staticAssets));


console.log(`Serving ${staticAssets}/index.html` )

app.get('/', (req, res) => {
  res.sendFile(path.resolve(`${staticAssets}/index.html`));
});


module.exports = app;


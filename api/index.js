const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const movieRoute = require('./routes/movie');
// const multer = require('multer');
const path = require('path');

const app = express();
dotenv.config();

app.use(express.json());
// app.use('/images', express.static(path.join(__dirname, '/images')));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('connected'))
  .catch((err) => console.log(err));

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post('/api/upload/single', upload.single('file'), (req, res) => {
//   res.status(200).json('Single file has been uploaded');
// });

// app.post('/api/upload/multiple', upload.array('files', 3), (req, res) => {
//   console.log(req.files);
//   res.status(200).json('Multiple files have been uploaded');
// });

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);

app.listen('5000', () => {
  console.log('backend is running!');
});

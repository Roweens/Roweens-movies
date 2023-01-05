const router = require('express').Router();
const Movie = require('../models/Movie');

//Create Movie

router.post('/add', async (req, res) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      desc: req.body.desc,
      quote: req.body.quote,
      type: req.body.type,
      year: req.body.year,
      limits: req.body.limits,
      director: req.body.director,
      actors: req.body.actors,
      duration: req.body.duration,
      genres: req.body.genres,
      trailer: req.body.trailer,
      imgSmall: req.body.imgSmall,
      imgBig: req.body.imgBig,
      country: req.body.country,
    });

    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all movies

router.get('/all', async (req, res) => {
  try {
    const movies = await Movie.find({});

    res.status(201).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

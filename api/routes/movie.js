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

router.get('/', async (req, res) => {
  const type = req.query.type;
  const genre = req.query.genre;
  const year = req.query.year;
  const country = req.query.country;

  console.log(req.query);

  try {
    let movies;
    if (type) {
      movies = await Movie.find({ type: type });
    } else {
      movies = await Movie.find({});
    }

    res.status(201).json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get one movie

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Rate movie

router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findById(req.body.id);
    updatedMovie.ratings = [...updatedMovie.ratings, req.body.rating];
    await updatedMovie.save();
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

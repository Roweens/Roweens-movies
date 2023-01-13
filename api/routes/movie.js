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
  const page = req.query.page;

  const options = {
    page: page,
    limit: 10,
    collation: {
      locale: 'en',
    },
  };

  try {
    let movies;

    if (type) {
      movies = await Movie.paginate({ type: type }, options);
    } else {
      movies = await Movie.paginate({}, options);
    }

    const count = await Movie.countDocuments({});
    res.set('total-count', count);
    res.status(201).json(movies.docs);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get random movie

router.get('/random', async (req, res) => {
  try {
    const randomMovie = await Movie.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(randomMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get one movie

router.get('/find/:id', async (req, res) => {
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

    const currentUserRating = updatedMovie.ratings.find(
      (rating) => rating.username === req.body.userId
    );
    if (currentUserRating) {
      const clearArr = updatedMovie.ratings.filter(
        (rating) => rating !== currentUserRating
      );
      const newRating = { username: req.body.userId, rating: req.body.rating };
      clearArr.push(newRating);
      updatedMovie.ratings = clearArr;
    } else {
      updatedMovie.ratings = [
        ...updatedMovie.ratings,
        { username: req.body.userId, rating: req.body.rating },
      ];
    }

    await updatedMovie.save();
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

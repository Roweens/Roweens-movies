const router = require('express').Router();
const User = require('../models/User');
const Movie = require('../models/Movie');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

//Update user
router.put('/update/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      // const { password, ...others } = updatedUser._doc;
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can update only your account');
  }
});

//Delete user
router.delete('/:id', verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted');
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You can delete only your account');
  }
});

//Add to watchlist

router.put('/watchlist/add/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.body.id);
    const user = await User.findById(req.params.id);

    if (!user.watchlist.find((watch) => watch.title === movie.title)) {
      user.watchlist.push(movie);
      await user.save();
    }

    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Remove from watchlist

router.delete('/watchlist/delete/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.body.id);
    const user = await User.findById(req.params.id);

    user.watchlist = user.watchlist.filter(
      (watch) => watch.title !== movie.title
    );
    await user.save();

    res.status(200).json(user.watchlist);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Add to watching list

router.put('/watching/add/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.body.id);
    const user = await User.findById(req.params.id);
    user.watching.push(movie);
    await user.save();
    res.status(500).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

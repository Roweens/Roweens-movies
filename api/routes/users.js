const router = require('express').Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');

//Update user
router.put('/:id', verify, async (req, res) => {
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

module.exports = router;

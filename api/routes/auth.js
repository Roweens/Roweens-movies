const router = require('express').Router();
const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Register
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json('Wrong credentials');

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json('Wrong credentials');

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.REFRESH_KEY
    );

    // const newRefreshToken = new Token({ refreshToken });
    // const token = await newRefreshToken.save();

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

//Logout

// //refresh token
// router.post('/refresh', async (req, res) => {
//   const refreshToken = req.body.token;

//   const token = await Token.findOne({ refreshToken: refreshToken });
//   if (!refreshToken) return res.status(401).json('You are not authenticated');
//   if (refreshToken !== token.refreshToken) {
//     return res.status(403).json('Refresh token is not valid');
//   }

//   jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, payload) => {
//     err && console.log(err);

//     const newAccessToken = jwt.sign(
//       { id: payload._id, isAdmin: payload.isAdmin },
//       process.env.SECRET_KEY,
//       {
//         expiresIn: '1h',
//       }
//     );

//     const newRefreshToken = jwt.sign(
//       { id: payload._id, isAdmin: payload.isAdmin },
//       process.env.REFRESH_KEY
//     );

//     const refreshToken = new Token({ newRefreshToken });
//     const token = await refreshToken.save();

//     res.status(200).json({
//       newAccessToken,
//       newRefreshToken,
//     });
//   });
// });

module.exports = router;

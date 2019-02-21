const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');



// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');


// @route GET api/users/test
// @desc Tests users route
// @access Public route
router.get('/test', (req, res) =>
  res.json({
    msg: 'Users Works'
  })
);


// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    // check for user
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar, // es6 syntax
        password: req.body.password
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // set newUser password to the hashde password
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});



// @route GET api/users/login
// @desc Login user / returning JWT Token
// @access Public
router.post('/login', (req, res) => {

  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // initialize Var
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({
    email: email
  }).then(user => {
    // check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    // after we find the user, we want to match the password
    // check password and compare password
    bcrypt //compare password and User.password
      .compare(password, user.password)
      // this will give us a true of false value
      .then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          //Create JWT payload
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey, {
              expiresIn: 3600
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            }
          );
        } else {
          errors.password = 'Password incorrect';
          return res.status(400).json(errors);
        }
      });
  });
});



// @route GET api/users/current
// @desc Returns current user
// @access Private

router.get('/current', passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    // access user with req.user
    // user is now in req.user
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  });


//  need to export router
module.exports = router;
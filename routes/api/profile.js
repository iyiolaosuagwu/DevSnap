const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');

// Load validation
const validateProfileInput = require('../../validation/profile');

// @route GET api/posts/test
// @desc Tests profile route
// @access Public route
router.get('/test', (req, res) =>
  res.json({
    msg: 'Profile Works'
  })
);


// @route GET api/posts
// @desc get current users profile
// @access Private route

router.get(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const errors = {};

    // logged in user
    Profile.findOne({
      user: req.user.id
    })
      // .populate('user', ['name', 'avatar'])
      .populate(user, ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST api/posts
// @desc Create user profile
// @access Private route

// Key note

router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  (req, res) => {
    const {
      errors,
      isValid
    } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    // get logged in user
    profileFields.user = req.user.id;

    // check if the feilds we are looking 4 as come in
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // Skills - Spilt into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // Social
    profileFields.social = {}; //social is an obj
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({
      //search for the logged in user by its Id
      user: req.user.id
    }).then(profile => {
      // if there is a profile we want to findOneAndUpdate
      if (profile) {
        // Update
        // update profile with new feilds coming
        // if user has a profile, we want to update it
        Profile.findOneAndUpdate(
            // who we want to update
            {
              user: req.user.id
            },
            // we want to set profile fields
            {
              $set: profileFields
            }, {
              new: true
            }
          ) // then respond with the profile
          .then(profile => res.json(profile));
      } else {
        // Create

        // if user doesent have a profile
        // Check if handle exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          //check if there is a profile that matches that handle
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }

          // if no handle, we go ahed and create a profile
          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//  need to export router
module.exports = router;
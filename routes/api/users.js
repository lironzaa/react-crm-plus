const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const validateCreateUserInput = require('../../validation/createUser');
const validateEditUserInput = require('../../validation/editUser');
const passport = require('passport');

router.post('/create', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCreateUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors)
      } else {
        const newUser = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          phone: req.body.phone
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findOneAndRemove(
    { _id: req.params.id },
    { new: true, useFindAndModify: false })
    .then(() => {
      res.json({ success: true })
    })
})

router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userDetails = {};
  if (req.body.firstName) userDetails.firstName = req.body.firstName;
  if (req.body.lastName) userDetails.lastName = req.body.lastName;
  if (req.body.username) userDetails.username = req.body.username;
  if (req.body.email) userDetails.email = req.body.email;
  if (req.body.phone) userDetails.phone = req.body.phone;

  const { errors, isValid } = validateEditUserInput(userDetails);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findByIdAndUpdate(
    { _id: req.params.id },
    userDetails,
    { new: true, useFindAndModify: false })
    .then(user => {
      res.json(user)
    })
    .catch(err => console.log(err));
})

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  User.find()
    .then(users => {
      if (!users) {
        errors.nousers = 'There are no users';
        return res.status(404).json(errors);
      }
      res.json(users)
    })
    .catch(err => {
      res.status(404).json({ users: 'There are no users' });
    })
})

module.exports = router;
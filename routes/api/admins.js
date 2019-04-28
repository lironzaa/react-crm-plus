const express = require('express');
const router = express.Router();
const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateLoginInput = require('../../validation/login');

router.post('/register', (req, res) => {
  const newAdmin = new Admin({
    name: req.body.name,
    password: req.body.password
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
      if (err) throw err;
      newAdmin.password = hash;
      newAdmin.save()
        .then(admin => res.json(admin))
        .catch(err => console.log(err))
    })
  })
})

router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const password = req.body.password;

  Admin.findOne({ name })
    .then(admin => {
      if (!admin) {
        errors.name = 'User not found';
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, admin.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: admin.id,
              name: admin.name,
            }
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                })
              }
            )
          } else {
            errors.password = 'Password is incorrect';
            return res.status(400).json(errors);
          }
        })
    })
})

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name
    })
  }
)

module.exports = router;
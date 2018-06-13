const User = require('../models/users.js');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
});

router.get('/me', (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;

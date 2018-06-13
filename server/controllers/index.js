const usersController = require('../controllers/users.js');
const router = require('express').Router();

router.use('/users', usersController);

module.exports = router;

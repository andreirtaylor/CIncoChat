'use strict';
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

//When in production serve from build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
} else {
  app.disable('etag');
}

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CONFIGURE REDIS FOR SESSIONS
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const client = require('redis').createClient({
  url: process.env.REDIS_URL
});

client.on('error', function(err) {
  console.log('Error ' + err);
});

// shared store for both the client and the socket
const store = new RedisStore({ client });

const sessionMiddleware = session({
    store,
    secret: process.env.SECRET_REDIS || 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
app.use(sessionMiddleware);

// INITIALIZE DB
require('./models');

// AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
// Setup serialization and deserialization of users
app.use('/auth', require('./auth.js'));

// ensure the user is authenticated. Do not allow them to
// access the routes if they are not
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({
    message: 'You must be logged in to access this resource'
  });
})

module.exports = { app, sessionMiddleware}   ;

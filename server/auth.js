var passport = require('passport'),
  local = require('passport-local').Strategy,
  bcrypt = require('bcrypt'),
  router = require('express').Router();

const Users = require('./models/users.js');
const SALT_ROUNDS = 10;

passport.use(
  new local(function(username, password, done) {
    Users.findOne({
      where: { email: username },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
      .then(result => {
        if (!result) {
          return done(null, false, { message: 'Unknown user: ' + username });
        }

        bcrypt
          .compare(password, result.dataValues.password)
          .then(function(res) {
            if (res == true) {
              // dont leak passwords to the user
              delete result.dataValues.password;
              return done(null, result.dataValues);
            }
            return done(null, false, {
              message: 'Invalid username or password'
            });
          });
      })
      .catch(error => {
        done(error);
      });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users.findOne({
    where: { id: id },
    attributes: { exclude: ['password'] }
  }).then(result => {
    if (!result) {
      done(null, null);
      return;
    }
    done(null, result);
  });
});

router.post('/register', async function(req, res) {
  // there is probably a better way, ensureAuthenticated?
  if (typeof req.user !== 'undefined') {
    // User is logged in.
    res.redirect('/dashboard');
    return;
  }

  // Saving the new user to DB
  let hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  // Store hash in your password DB.
  let user = await Users.findOne({where: {email:req.body.email}});
  if(user) return res.status(400).send({err:"User with the same email exists"});

  let user2 = await Users.findOne({where: {username:req.body.username}});
  if(user2) return res.status(400).send({err:"User with the same username exists"});

  Users.create({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  })
    .then(user => {
      io.emit("NEW_USER")
      res.status(200).send(user)
    })
    .catch(error => res.status(400).send({err: error.errors[0].message}));
});

router.post(
  '/login',
  function(req, res, next) {
    // passport needs the username in the request
    req.body.username = req.body.email;
    next();
  },
  passport.authenticate('local'),
  function(req, res) {
    res.status(200).send(req.user);
  }
);

router.get('/logout', function(req, res, next) {
  if (process.env.NODE_ENV !== 'production') {
    // when using cookie sessions you have to explicitly set the session to null
    req.session = null;
  }
  req.logout();
  res.status(200).send();
});

module.exports = router;

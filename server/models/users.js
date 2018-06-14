let Sequelize = require('sequelize');
let db = require('./db.js');

const Users = db.define(
  'Users',{
    username: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.TEXT,
      required: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        notEmpty: true
      }
    }
  }
);

module.exports = Users;

let Sequelize = require('sequelize');
let db = require('./db.js');

const Users = db.define(
  'Users',
  {
    first_name: {
      type: Sequelize.STRING,
      required: true,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
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
    },
    username: {
      type: Sequelize.TEXT,
      required: true,
      validate: {
        notEmpty: true
      }
    },
    points: {
      type: Sequelize.INTEGER,
      required: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = Users;

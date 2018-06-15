let Sequelize = require('sequelize');
let db = require('./db.js');

const Messages = db.define(
  'Messages',{
    sender: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    recipient: {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    },
    message: {
      type: Sequelize.DataTypes.STRING,
    }
  }
);

module.exports = Messages;

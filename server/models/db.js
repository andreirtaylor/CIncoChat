const Sequelize = require('sequelize');

const config = require('../config/config.json');
var sequelize = new Sequelize(config.development);

module.exports = sequelize;

const Sequelize = require('sequelize');

if (process.env.NODE_ENV == 'production') {
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    operatorsAliases: false
  });
} else {
  const config = require('../config/config.json');
  var sequelize = new Sequelize(config.development);
}

module.exports = sequelize;

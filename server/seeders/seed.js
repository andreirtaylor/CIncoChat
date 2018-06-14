const User = require('../models/users.js');

async function seed() {

  let Tim = await User.create({
    username: 'TimHeidecker',
    email: 'tim@cinco.com',
    password: '$2a$10$rsEAEuci58tun.xGH62sROYgP4QWEEVdWCIC8eAUui4IWK3QHosK2',
  });

  let Eric = await User.create({
    username: 'Eric Wareheim',
    email: 'eric@cinco.com',
    password: '$2a$10$rsEAEuci58tun.xGH62sROYgP4QWEEVdWCIC8eAUui4IWK3QHosK2',
  });

  let DrSteveBrule = await User.create({
    username: 'DrSteveBrule',
    email: 'steve@cinco.com',
    password: '$2a$10$rsEAEuci58tun.xGH62sROYgP4QWEEVdWCIC8eAUui4IWK3QHosK2',
  });

}

module.exports = {
  seed
};

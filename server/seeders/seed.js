const User = require('../models/users.js');
const Messages = require('../models/messages.js');

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

  await Messages.create( {sender:Tim.id, recipient:Eric.id, message: "Hey wanna go play with our bowels?"})
  await Messages.create(  {recipient:Tim.id, sender:Eric.id, message: "Not really, I threw mine in the trash already...."})
  await Messages.create( {sender:Tim.id, recipient:Eric.id, message: "Well I'll just do it without you pal"})
  await Messages.create(    {recipient:Tim.id, sender:Eric.id, message: "Go eat pitzmans you loser."})
  await Messages.create(    {sender:Tim.id, recipient:DrSteveBrule.id, message: "Bowels?"})
  await Messages.create(  {recipient:Tim.id, sender:DrSteveBrule.id, message: "Uhhhhhhhhhhh"})


}

module.exports = {
  seed
};

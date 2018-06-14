let User = require('./models/users.js')
let Messages = require('./models/messages.js')
const Op = require('sequelize').Op


module.exports = async (sock) => {
  const id = sock.request.session.passport.user;

  sock.join(id);

  sock.on('GET_USERS', async () => {
    let users = await User.findAll();
    sock.emit('GET_USERS', users);
  });

  sock.on('GET_USER', async () => {
    const user = await User.findById(id);
    delete user.password
    sock.emit('GET_USER', user);
  });

  sock.on('GET_MESSAGES', async ({room}) => {
    // messages that have been sent or received from the other person
    const messages = await Messages.findAll({ where: {
      [Op.and]: {
        from: {
          [Op.or]: [room, id]
        },
        to: {
          [Op.or]: [room, id]
        }
      }
      },
      order: [['updatedAt', 'DESC']]
    });

    sock.emit('RELOAD_MESSAGES', messages);
  });
}

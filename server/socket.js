let User = require('./models/users.js');
let Messages = require('./models/messages.js');
const Op = require('sequelize').Op;

module.exports = async sock => {
  const id = sock.request.session.passport.user;

  // every socket joins based on the users id
  // When you want to send a user a private message
  // send it to their id
  sock.join(id);

  // dont leak passwords
  sock.on('GET_USERS', async () => {
    // Dont return the current user
    let users = await User.findAll({ where: { id: { [Op.ne]: id } } });
    users.forEach(user => delete user.password);
    sock.emit('GET_USERS', users);
  });

  // dont leak passwords
  sock.on('GET_USER', async () => {
    const user = await User.findById(id);
    delete user.password;
    sock.emit('GET_USER', user);
  });

  sock.on('NEW_MESSAGE', async ({ msg, recipient }) => {
    let message = await Messages.create({
      sender: id,
      recipient,
      message: msg
    });

    io.to(recipient).emit('NEW_MESSAGE', message);
    io.to(id).emit('NEW_MESSAGE', message);
  });

  // this is really a user id but I wanted to
  // leave it open for "channels/group messages"
  // I think I could make it work with channels
  // with minimal effort.
  sock.on('GET_MESSAGES', async ({ room }) => {
    // messages that have been sent or received from the other person
    // and the sender
    const messages = await Messages.findAll({
      where: {
        [Op.and]: {
          sender: {
            [Op.or]: [room, id]
          },
          recipient: {
            [Op.or]: [room, id]
          }
        }
      },
      // order by the time the messages were received
      order: [['updatedAt']]
    });

    sock.emit('RELOAD_MESSAGES', messages);
  });
};

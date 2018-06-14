let User = require('./models/users.js')
module.exports = async (sock) => {
  sock.on('GET_USERS', async () => {
    // we tell the client to execute 'new message'
    let users = await User.findAll();
    sock.emit('GET_USERS', users);
  });

  sock.on('GET_USER', async () => {
    // we tell the client to execute 'new message'

    const id = sock.request.session.passport.user;
    const user = await User.findOne({id});
    delete user.password
    sock.emit('GET_USER', user);
  });
}

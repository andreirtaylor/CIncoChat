'use strict';

const User = require('./users.js');
const Messages = require('./messages.js');

let db = require('./db.js');

// if you run this function you will completely reset the database
async function syncDB() {
  try {
    await db.sync({ force: true });
    console.log('Syncing is done! The database is ready to use');
    await require('../seeders/seed.js').seed();
  } catch (err) {
    console.error('There was an error syncing the database: ', err);
  }
}

// run node server/models --seed to reset db
if (process.argv.includes('--seed')) {
  syncDB().then(() => {
    if (process.argv.includes('--seed')) db.close();
  });
}

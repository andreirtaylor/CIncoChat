'use strict';

const User = require('./users.js');

let db = require('./db.js');

async function syncDB() {
  try {
    await db.sync({ force: true });
    console.log('Syncing is done! The database is ready to use');
    await require('../seeders/seed.js').seed();
  } catch (err) {
    console.error('There was an error syncing the database: ', err);
  }
}

if (process.argv.includes('--seed')) {
  syncDB().then(() => {
    if (process.argv.includes('--seed')) db.close();
  });
}

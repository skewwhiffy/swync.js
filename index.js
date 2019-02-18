'use strict';

const Migrator = require('./db/src/migrate');
const Db = require('./db/src/db');

const db = new Db('~/.config/swync.js/db');
new Migrator(db)
  .run()
  .then(() => {
    require('./backend/src/index');
  });

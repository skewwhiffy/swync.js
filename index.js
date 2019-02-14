'use strict';

const migrations = require('./db/src/migrate');
migrations
  .run()
  .then(() => {
    require('./backend/src/index');
  });

'use strict';

const Migrator = require('./db/src/migrate');
new Migrator()
  .run()
  .then(() => {
    require('./backend/src/index');
  });

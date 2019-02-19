'use strict';

const fs = require('fs');
const path = require('path');
const Migrator = require('./db/src/migrate');
const instantiator = require('./backend/src/ioc/instantiator');

instantiator
  .instantiate(Migrator)
  .run()
  .then(() => {
    require('./backend/src/index');
  });

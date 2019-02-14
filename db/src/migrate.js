'use strict';

const path = require('path');
const fs = require('fs');
const migrationsFolder = path.join(__dirname, '../migrations');

const listMigrations = folder => new Promise((resolve, reject) => {
  fs.readdir(folder, (err, docs) => {
    if (err) {
      reject(err);
      return;
    }
    const sorted = docs.sort();
    resolve(sorted);
  });
});

const run = async () => {
  const migrations = await listMigrations(migrationsFolder);
  console.log(migrations);
  console.log('Hello world');
};

module.exports = {
  run
};

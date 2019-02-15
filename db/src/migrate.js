'use strict';

const path = require('path');
const fs = require('fs');
const Db = require('./db');
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

const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, doc) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(doc);
  });
});


class Migrator {
  constructor(db) {
    this.db = db;
  }

  async run() {
    const migrations = await listMigrations(migrationsFolder);
    const sql = await Promise.all(migrations
      .map(it => path.join(migrationsFolder, it))
      .map(it => readFile(it)))
    console.log(sql[0]);
    console.log('Hello world');
  }
}


module.exports = Migrator;

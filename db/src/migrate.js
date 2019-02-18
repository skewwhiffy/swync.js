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
  fs.readFile(filePath, 'utf-8', (err, doc) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(doc);
  });
});


class Migrator {
  constructor(db) {
    if (!db) throw Error('No DB object passed in');
    this.db = db;
  }

  async run() {
    const migrations = await listMigrations(migrationsFolder);
    const sql = await Promise.all(migrations
      .map(it => path.join(migrationsFolder, it))
      .map(it => readFile(it)));
    for (let i = 0; i < sql.length; i++) {
      await this.db.execute(sql[i]);
    }
  }
}


module.exports = Migrator;

'use strict';

const md5 = require('md5');
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

  async ensureMigrationsTableExists() {
    const sql = `
CREATE TABLE IF NOT EXISTS __migrations (md5 VARCHAR(255));
    `;
    await this.db.execute(sql);
  }

  async run() {
    await this.ensureMigrationsTableExists();
    const migrations = await listMigrations(migrationsFolder);
    const sql = await Promise.all(migrations
      .map(it => path.join(migrationsFolder, it))
      .map(it => readFile(it)));
    for (let i = 0; i < sql.length; i++) {
      const hash = md5(sql[i]);
      const runBefore = await this.db.execute(
        `SELECT * FROM __migrations WHERE md5 = ? `,
        [hash]
      );
      if (runBefore.length > 0) continue;
      await this.db.execute('INSERT INTO __migrations (md5) VALUES (?)', [hash]);
      await this.db.execute(sql[i]);
    }
  }
}


module.exports = Migrator;

'use strict';

const sqlite = require('sqlite3');
const Database = sqlite.Database;

const open = path => new Promise((resolve, reject) => {
  const db = new Database(path, err => {
    if (err) reject(err);
    else resolve(db);
  });
});

const run = (db, sql, params) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

class Db {
  constructor(path) {
    this.path = path || ':memory:';
  }

  async ensureOpen() {
    this.db = this.db || await open(this.path);
  }

  async execute(sql, params) {
    await this.ensureOpen();
    return await run(this.db, sql, params);
  };

  close() {
    if (this.db) this.db.close();
    this.db = undefined;
  }
}

module.exports = Db

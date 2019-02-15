'use strict';

const path = require('path');
const safeId = require('generate-safe-id');
const fs = require('fs');
const expect = require('chai').expect;
const Db = require('./db');

describe('Database wrapper', () => {
  describe('on disk', () => {
    let newDbPath;
    let db;

    beforeEach(() => {
      newDbPath = path.join(__dirname, `${safeId()}.db`);
      db = new Db(newDbPath);
    });

    afterEach(done => {
      db.close();
      fs.unlink(newDbPath, done);
    });

    it('creates a database when it doesn\'t exist', async () => {
      await db.ensureOpen();

      expect(fs.existsSync(newDbPath)).to.be.true;
    });
  });

  describe('in memory', () => {
    let db;

    beforeEach(async () => {
      db = new Db();
      db.ensureOpen();
    });

    afterEach(() => {
      db.close();
    });

    it('can create and use a table', async () => {
      await db.execute('create table example (id varchar(255))');
      await db.execute('insert into example (id) values (?)', ['hello']);

      const result = await db.execute('select * from example');

      expect(result).to.eql([{ id: 'hello' }]);
    });
  });
});

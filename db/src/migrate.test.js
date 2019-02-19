'use strict';

const expect = require('chai').expect;
const Db = require('./db');
const Migrator = require('./migrate');

describe('Migrator', () => {
  let db;
  let migrator;

  beforeEach(async () => {
    db = new Db(':memory:');
    migrator = new Migrator(db);
    await migrator.run();
  });

  afterEach(() => {
    db.close();
  });

  it('creates users table', async () => {
    const result = await db.execute('select * from users');

    expect(result).to.be.ok;
  });

  it('deals with running migrations multiple times', async () => {
    await migrator.run();
  });
});

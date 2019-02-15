'use strict';

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

  it('creates user table', async () => {
    const result = await db.execute('select * from [user]');

    expect(result).to.be.truthy;
  });
});

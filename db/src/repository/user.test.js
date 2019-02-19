'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const safeId = require('generate-safe-id');
const Database = require('../db');
const Migrator = require('../migrate');
const UserRepository = require('./user');

describe('User repository', () => {
  let db;
  let repo;

  beforeEach(async () => {
    db = new Database();
    const migrator = new Migrator(db);
    await migrator.run();
    repo = new UserRepository(db);
  });

  describe('getUser', () => {
    it('returns null when there is no user', async () => {
      const user = await repo.getUser();

      expect(user).to.not.be.ok;
    });

    it('throws with multiple users', async () => {
      await Promise.all(_.range(5).map(() => db.execute(`
INSERT INTO users (id, displayName, refreshToken, redirectUri)
VALUES (?, ?, ?, ?)
      `, [
        safeId(),
        safeId(),
        safeId(),
        safeId(),
      ])));

      try {
        await repo.getUser();
      } catch (e) {
        return;
      }
      expect(true).to.be.false;
    });
  });

  it('can persist a user', async () => {
    const user = {
      id: safeId(),
      displayName: safeId(),
      redirectUri: safeId(),
      refreshToken: safeId()
    };
    await repo.addUser(user);

    const returned = await repo.getUser();

    expect(returned).to.eql(user);
  });
});

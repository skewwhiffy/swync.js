'use strict';

class UserRepository {
  constructor(db) {
    if (!db) throw Error('Need a DB object');
    this.db = db;
  }

  async addUser(user) {
    await this.db.execute(`
INSERT INTO users (id, displayName, refreshToken, redirectUri)
VALUES (?, ?, ?, ?)
    `, [
      user.id,
      user.displayName,
      user.refreshToken,
      user.redirectUri
    ]);
  }

  async getUser() {
    const users = await this.db.execute('SELECT * FROM users');
    if (users.length > 1) throw Error('Multiple logged in users not supported');
    return users[0];
  }
}

module.exports = UserRepository;

'use strict';

const UserRepository = require('../../../db/src/repository/user');

class Handler {
  constructor(onedrive, userRepository) {
    if (!userRepository) throw Error('Need a user Repository');
    if (!onedrive) throw Error('Need onedrive client');
    this.userRepository = userRepository;
    this.onedrive = onedrive;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res) {
    const authCode = req.body.authCode;
    const accessToken = await this.onedrive.getAccessTokenFromAuthCode(
      authCode,
      // TODO: Commonize 38080
      'http://localhost:38080'
    );
    const user = await this.onedrive.getUser(accessToken, 'http://localhost:38080');
    await this.userRepository.addUser(user);
    res.status(202).send();
  };
}

module.exports = Handler;

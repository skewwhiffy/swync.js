'use strict';

const UserRepository = require('../../../db/src/repository/user');
const onedrive = require('../service/onedrive');

class Handler {
  constructor(userRepository) {
    if (!userRepository) throw Error('Need a user Repository');
    this.userRepository = userRepository;
  }
  async handle(req, res) {
    const authCode = req.body.authCode;
    //const accessToken = await onedrive.getAccessTokenFromAuthCode();
    /*
        val requestDeserialized = OnedriveCallbackRequest(request)
        val accessToken = dependencies.oneDrive.getAccessToken(
          requestDeserialized.authCode, dependencies.config.defaultRedirectUri())
        val userDetails = dependencies.oneDrive.getUser(
          accessToken, dependencies.config.defaultRedirectUri())
        dependencies.userRepository.addUser(userDetails)
        return Response(ACCEPTED)
        */
    res.status(202).send();
  };
}

module.exports = Handler;

'use strict';

class Handler {
  constructor(userRepository, onedrive) {
    if (!userRepository) throw Error('Need user repository');
    if (!onedrive) throw Error('Need onedrive');
    this.userRepository = userRepository;
    this.onedrive = onedrive;
    this.handle = this.handle.bind(this);
  }

  async handle (req, res) {
    const user = await this.userRepository.getUser();
    if (!user) {
      const redirect = this.onedrive.getAuthenticationUrl('http://localhost:38080');
      res.send({ redirect });
      return;
    }
    const response = {
      displayName: user.displayName
    };
    res.send(response);
  };
}

module.exports = Handler

'use strict';

class Handler {
  constructor(onedrive) {
    if (!onedrive) throw Error('Need onedrive');
    this.onedrive = onedrive;
  }
  async handle (req, res) {
    // TODO: Commonize localhost:38080
    const redirect = this.onedrive.getAuthenticationUrl('http://localhost:38080');
    res.send({ redirect });
  };
}

module.exports = Handler

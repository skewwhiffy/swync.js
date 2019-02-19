'use strict';

class Handler {
  async handle(req, res) {
    const urlPath = req
      .url
      .split('/')
      .filter(it => it);
    if (urlPath.length < 2 || urlPath[0] !== 'api' || urlPath[1] !== 'items') {
      throw Error('Wrong path');
    }
    const path = urlPath.splice(1, 2);
    res.send({});
  };
}

module.exports = Handler;

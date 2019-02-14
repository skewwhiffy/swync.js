'use strict';

const onedrive = require('../service/onedrive');

const handle = async (req, res) => {
  const redirect = onedrive.getAuthenticationUrl('http://localhost:38080');
  res.send({ redirect });
};

module.exports = handle

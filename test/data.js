'use strict';

const safeId = require('generate-safe-id');

const getTestUser = () => ({
  id: safeId(),
  displayName: safeId(),
  refreshToken: safeId(),
  redirectUri: safeId()
});

module.exports = {
  getTestUser
};

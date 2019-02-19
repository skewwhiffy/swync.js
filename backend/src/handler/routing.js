'use strict';

const GetCurrentUserHandler = require('./get.current.user');
const RecordAuthCodeHandler = require('./record.auth.code');
const instantiator = require('../ioc/instantiator');

const getCurrentUserHandler = instantiator.instantiate(GetCurrentUserHandler);
const recordAuthCodeHandler = instantiator.instantiate(RecordAuthCodeHandler);

const setup = app => {
  app.get('/api', (req, res) => res.send('Hello world'));
  app.get('/api/user/me', getCurrentUserHandler.handle);
  app.post('/api/onedrive/authcode', recordAuthCodeHandler.handle);
}

module.exports = setup;

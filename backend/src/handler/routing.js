'use strict';

const GetCurrentUserHandler = require('./get.current.user');
const RecordAuthCodeHandler = require('./record.auth.code');
const GetItemsHandler = require('./get.items');
const instantiator = require('../ioc/instantiator');

const getCurrentUserHandler = instantiator.instantiate(GetCurrentUserHandler);
const recordAuthCodeHandler = instantiator.instantiate(RecordAuthCodeHandler);
const getItemsHandler = instantiator.instantiate(GetItemsHandler);

const setup = app => {
  app.get('/api', (req, res) => res.send('Hello world'));
  app.get('/api/user/me', getCurrentUserHandler.handle);
  app.post('/api/onedrive/authcode', recordAuthCodeHandler.handle);
  app.get('/api/items*', getItemsHandler.handle);
}

// TODO:
// me
// items
// music


module.exports = setup;

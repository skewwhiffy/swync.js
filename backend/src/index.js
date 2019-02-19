'use strict';

const GetCurrentUserHandler = require('./handler/get.current.user');
const RecordAuthCodeHandler = require('./handler/record.auth.code');
const instantiator = require('./ioc/instantiator');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const getCurrentUserHandler = instantiator.instantiate(GetCurrentUserHandler);
const recordAuthCodeHandler = instantiator.instantiate(RecordAuthCodeHandler);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(express.static('backend/resources/www'));
app.get('/api', (req, res) => res.send('Hello world'));
app.get('/api/user/me', getCurrentUserHandler.handle);
app.post('/api/onedrive/authcode', recordAuthCodeHandler.handle);
app.get('*', (req, res) => res.sendFile('resources/www/index.html', { root: __dirname + '/..' }));

// TODO:
// files
// me
// items
// music

const port = 38080;
app.listen(port, () => console.log(`Listening on port ${port}`));

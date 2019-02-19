'use strict';

const routing = require('./handler/routing');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// TODO: Commonize this port 38080
const port = 38080;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(express.static('backend/resources/www'));
routing(app);
app.get('*', (req, res) => res.sendFile('resources/www/index.html', { root: __dirname + '/..' }));

app.listen(port, () => console.log(`Listening on port ${port}`));

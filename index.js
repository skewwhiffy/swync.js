const getCurrentUserHandler = require('./backend/handler/get.current.user');
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('backend/resources/www'));
app.get('/api', (req, res) => res.send('Hello world'));
app.get('/api/user/me', getCurrentUserHandler);
app.get('*', (req, res) => res.sendfile('backend/resources/www/index.html'));

// TODO:
// files
// me
// items
// music

const port = 38080;
app.listen(port, () => console.log(`Listening on port ${port}`));

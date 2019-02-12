const express = require('express');
const app = express();

app.use(express.static('backend/resources/www'));
app.get('/api', (req, res) => res.send('Hello world'));
app.get('*', (req, res) => res.sendfile('backend/resources/www/index.html'));
const port = 38080;
app.listen(port, () => console.log(`Listening on port ${port}`));

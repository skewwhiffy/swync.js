const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello world'));
const port = 38080;
app.listen(port, () => console.log(`Listening on port ${port}`));

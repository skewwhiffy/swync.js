const axios = require('axios');

axios.get('http://localhost:38080/api/items/poo/face')
  .then(it => console.log(it.status));

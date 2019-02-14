const onedrive = require('../service/onedrive');

const handle = async (req, res) => {
  res.send({
    redirect: `http://localhost:38080`
  });
}

module.exports = handle

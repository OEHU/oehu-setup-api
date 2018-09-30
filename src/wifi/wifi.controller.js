const piWifi = require("pi-wifi");
const util = require('util');

const wifiScan = util.promisify(piWifi.scan);

exports.scan = async (req, res) => {
  let networks = await wifiScan());
  res.json({result: networks});
}

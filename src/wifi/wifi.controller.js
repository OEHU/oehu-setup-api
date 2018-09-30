const piWifi = require("pi-wifi");
const util = require('util');

const wifiScan = util.promisify(piWifi.scan);
const wifiConnect = util.promisify(piWifi.connect);

exports.scan = async (req, res) => {
  let networks = await wifiScan();
  res.json({result: networks});
}

exports.connect = async (req, res) => {
  let params = req.params;

  await wifiConnect(params.ssid, params.password);
  res.json({success: true});
}

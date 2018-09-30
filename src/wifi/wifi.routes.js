const wifi = require("./wifi.controller.js");
const oehu = require("../oehu/oehu.controller.js");
module.exports = [
	{
		method: 'GET',
		path: '/wifi/scan',
		handler: [
                oehu.cors,
                wifi.scan,
             ],
	},
  {
		method: 'GET',
		path: '/wifi/connect/:ssid/:password',
		handler: [
                oehu.cors,
                wifi.connect,
             ],
	}
  {
		method: 'GET',
		path: '/wifi/status',
		handler: [
                oehu.cors,
                wifi.status,
             ],
	}
]

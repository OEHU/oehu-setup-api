const oehu = require("./oehu.controller.js");

module.exports = [
	{
		method: 'GET',
		path: '/oehu/getconfig',
		handler: [
                oehu.cors,
                oehu.getConfig
             ],
	},
  {
		method: 'GET',
		path: '/oehu/generateNewPhrase',
		handler: [
                oehu.cors,
                oehu.generateNewPhrase,
             ],
    doc: {
        name: 'Generate new phrase',
        description: 'Generates a new mnemonic phrase and save it to config'
    }
	},
  {
		method: 'GET',
		path: '/oehu/getKeypair',
		handler: [
                oehu.cors,
                oehu.getKeypair,
             ],
    doc: {
        name: 'Get keypair',
        description: 'Generates a new mnemonic phrase and save it to config'
    }
	},
  {
		method: 'GET',
		path: '/oehu/registerDevice/:deviceType/:lat/:long/:locationAccuracy/:householdType/:occupants',
		handler: [
                oehu.cors,
                oehu.newDeviceId,
             ],
	},
]

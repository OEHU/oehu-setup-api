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
		path: '/oehu/getConfigurated',
		handler: [
                oehu.cors,
                oehu.getConfigurated,
             ],
    doc: {
        name: 'Get configurated',
        description: 'Check if the OEHU device is configurated'
    }
	},
  {
		method: 'GET',
		path: '/oehu/startEmulator',
		handler: [
                oehu.cors,
                oehu.startEmulator,
             ],
    doc: {
        name: 'Start Emulator',
        description: 'Set emulator mode on'
    }
	},
  {
		method: 'GET',
		path: '/oehu/stopEmulator',
		handler: [
                oehu.cors,
                oehu.stopEmulator,
             ],
    doc: {
        name: 'Stop Emulator',
        description: 'Set emulator mode off'
    }
	},
  {
		method: 'GET',
		path: '/oehu/isEmulating',
		handler: [
                oehu.cors,
                oehu.isEmulating,
             ],
    doc: {
        name: 'Is emulating',
        description: 'Check if emulator mode is on'
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
  {
		method: 'GET',
		path: '/oehu/start',
		handler: [
                oehu.cors,
                oehu.start,
             ],
    doc: {
        name: 'Start OEHU',
        description: 'Start OEHU device'
    }
	},
  {
		method: 'GET',
		path: '/oehu/stop',
		handler: [
                oehu.cors,
                oehu.stop,
             ],
    doc: {
        name: 'Stop OEHU',
        description: 'Stop OEHU device'
    }
	},
  {
		method: 'GET',
		path: '/oehu/isRunning',
		handler: [
                oehu.cors,
                oehu.isRunning,
             ],
    doc: {
        name: 'is running',
        description: 'check if the device is pushing data'
    }
	},
]

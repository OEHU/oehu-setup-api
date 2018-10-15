# oehu-setup-api

This `oehu-setup-api` repository exists of an internal API to setup OEHU.

The Raspberry Pi runs the API (see https://oehu.org/get-started to get started with OEHU).

Example function calls are:

- startReadWrite
- updateConfigValue
- getConfig
- newDeviceId

## API End Points

On 2018-10-15 the following end points were available:

    /wifi/scan
    /wifi/connect/:ssid/:password
    /wifi/status
    /wifi/disconnect
    /oehu/getconfig
    /oehu/generateNewPhrase
    /oehu/getKeypair
    /oehu/getConfigurated
    /oehu/startEmulator
    /oehu/stopEmulator
    /oehu/isEmulating
    /oehu/registerDevice/:deviceType/:lat/:long/:locationAccuracy/:householdType/:occupants
    /oehu/start
    /oehu/stop
    /oehu/isRunning

See the following files for a working/updated list of API end points:

- https://github.com/OEHU/oehu-setup-api/blob/master/src/oehu/oehu.routes.js
- https://github.com/OEHU/oehu-setup-api/blob/master/src/wifi/wifi.routes.js

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

API server will listen on [http://localhost:8000](http://localhost:8000) & watch for changes to restart.

## Production

```bash
npm start
```

## Tests

The tests are made with [AVA](https://github.com/avajs/ava), [nyc](https://github.com/istanbuljs/nyc) and [mono-test-utils](https://github.com/terrajs/mono-test-utils) in `test/`:

```bash
npm test
```

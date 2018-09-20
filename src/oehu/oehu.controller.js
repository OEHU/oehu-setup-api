const fs = require("fs");
const util = require('util');
const bip39 = require('bip39');
const BigchainDB = require('bigchaindb-driver');
const vehUploader = require("veh-bigchaindb-uploader").default;

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const configFile = "./config.json";

const readConfig = async () => {
  let config = await readFile(configFile, "utf8");
  return JSON.parse(config);
}

const getKeypair = async () => {
    let config = await readConfig();
    return new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed(config.phrase).slice(0,32));
}

const updateConfigValue = async (param, value) => {
    let config = await readConfig();
    config[param] = value;
    await writeFile(configFile, JSON.stringify(config, null, 2));
}

exports.generateNewPhrase = async (req, res) => {
    let phrase = bip39.generateMnemonic();
    let currentConfig = await readConfig();
    currentConfig.phrase = phrase;
    await writeFile(configFile, JSON.stringify(currentConfig, null, 2));
    res.json({success: true});
}

exports.getConfig = async (req, res) => {
    let config = await readConfig();
    res.json(config);
}

exports.getKeypair = async (req, res) => {
    let keypair = await getKeypair();
    console.log(keypair);
    res.send(JSON.stringify(keypair));
}

exports.newDeviceId = async (req, res) => {
    let keypair = await getKeypair();
    let uploader = new vehUploader({keyPair: keypair});
    let params = req.params;

    console.log(params);
    console.log(params.deviceType, {lat: params.lat, long: params.long}, params.locationAccuracy, params.householdType, params.occupants);
    //let newID = await uploader.registerDevice("SMART_METER", {lat: 51.923514, long: 4.469048}, 100, "office", 5);
    let newID = await uploader.registerDevice(params.deviceType, {lat: params.lat, long: params.long}, params.locationAccuracy, params.householdType, params.occupants);
    updateConfigValue("deviceID", newID);
    res.json({deviceID: newID});
}

exports.cors = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

exports.getDeviceID = async (req, res) => {

}

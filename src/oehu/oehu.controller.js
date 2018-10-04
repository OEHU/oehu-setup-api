const fs = require("fs");
const util = require('util');
const bip39 = require('bip39');
const BigchainDB = require('bigchaindb-driver');
const vehUploader = require("veh-bigchaindb-uploader").default;
const VehReadWrite = require("veh-read-and-write").default;

let readWriteInstance;


const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const configFile = "./config.json";


const readConfig = async () => {
  let config;
  try {
    config = await readFile(configFile, "utf8");
  } catch (e) {
    //if there is no config file create one
    await writeFile(configFile, "{}");
    config = await readFile(configFile, "utf8");
  }
  return JSON.parse(config);
}

const getKeypair = async () => {
    let config = await readConfig();
    return new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed(config.phrase).slice(0,32));
}

const startReadWrite = async () => {
  let config = await readConfig();

  readWriteInstance = undefined; //delete current instance

  if(config.running) { //if it should be running start it
      if(!config.emulator) {
        config.emulator = false;
      }
      console.log("starting OEHU device");

      readWriteInstance = new VehReadWrite({
        keyPair: await getKeypair(),
        deviceID: config.deviceID,
        emulator: config.emulator,
        network: "http://128.199.46.166:9984/api/v1/",
      });
      readWriteInstance.start();
  }
}

startReadWrite(); //start read write

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
    res.send(JSON.stringify(keypair));
}

exports.newDeviceId = async (req, res) => {
    let keypair = await getKeypair();
    let uploader = new vehUploader({keyPair: keypair, network: "http://128.199.46.166:9984/api/v1/"});
    let params = req.params;
    //let newID = await uploader.registerDevice("SMART_METER", {lat: 51.923514, long: 4.469048}, 100, "office", 5);
    let newID = await uploader.registerDevice(params.deviceType, {lat: params.lat, long: params.long}, params.locationAccuracy, params.householdType, params.occupants);
    updateConfigValue("deviceID", newID);
    res.json({deviceID: newID});
}

exports.getConfigurated = async (req, res) => {
    let config = await readConfig();
    let configurated = false;

    if(config.phrase && config.phrase.split(" ").length == 12 && config.deviceID && config.deviceID.indexOf("devices") != -1){
        configurated = true;
    }
    res.json({configurated: configurated});
}


exports.startEmulator = async (req, res) => {
    await updateConfigValue("emulator", true);
    res.json({success: true});
}

exports.stopEmulator = async (req, res) => {
    await updateConfigValue("emulator", false);
    res.json({success: true});
}

exports.isEmulating = async (req, res) => {
    let config = await readConfig();

    if(!config.emulator) {
        config.emulator = false;
    }

    res.json({result: config.emulator});
}

exports.start = async (req, res) => {
    await updateConfigValue("running", true);
    await startReadWrite();
    res.json({success: true});
}

exports.stop = async (req, res) => {
    await updateConfigValue("running", false);
    await startReadWrite();
    res.json({success: true});
}

exports.isRunning = async (req, res) => {
    let config = await readConfig();

    if(!config.running) {
        config.running = false;
    }
    res.json({result: config.running});
}


/*
  Cors middleware
  This needs to be more strict in production
 */
exports.cors = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}

exports.getDeviceID = async (req, res) => {

}

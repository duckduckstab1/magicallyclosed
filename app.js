// ========================================================================
// Server init
// ========================================================================

// Filesystem reading functions
const fs = require("fs-extra");

// Load settings
try {
    stats = fs.lstatSync("settings.json");
} catch (e) {
    // If settings do not yet exist
    if (e.code == "ENOENT") {
        try {
            fs.copySync("settings.example.json", "settings.json");
            console.log("Created new settings file.");
        } catch (e) {
            console.log(e);
            throw "Could not create new settings file.";
        }
        // Else, there was a misc error (permissions?)
    } else {
        console.log(e);
        throw "Could not read 'settings.json'.";
    }
}

// Load settings into memory
const settings = require("./settings.json");

// Setup basic express server

// Maintenance Configs
// Options: true and false
updating = false;

if (updating == true) {
    var express = require("express");
    var app = express();
    if (settings.express.serveStatic) app.use(express.static("../build/maintenance/themes/win_7"));
    var server = require("http").createServer(app);
} else {
    var express = require("express");
    var app = express();
    if (settings.express.serveStatic) app.use(express.static("../build/www_git"));
    var server = require("http").createServer(app);
}
var options = {
    key: fs.readFileSync("./privkey2.pem"),
    cert: fs.readFileSync("./cert2.pem"),
};
// Shutdown Configs
// Options: true and false
offline = false;

if (offline == true) {
var express = require('express');
var app = express();
if (settings.express.serveStatic)
	app.use(express.static('./build/shutdown/themes/win_7'));
var server = require('http').createServer(app);
var server2 = require("https").createServer(options, app);
} else {
var express = require('express');
var app = express();
if (settings.express.serveStatic)
	app.use(express.static('./build/www_git'));
var server = require('http').createServer(app);
var server2 = require("https").createServer(options, app);
};

// Init socket.io
var io = require("socket.io")(server, {
    cors: {
       origin: '*'
    },
   transports: ['websocket']
});
var io2 = require("socket.io")(server2, {
    cors: {
       origin: '*'
    },
   transports: ['websocket']
});
var port = process.env.port || settings.port;
var port2 = process.env.port_ssl || 8443;

exports.io = io;
exports.io2 = io2;

// Init sanitize-html
var sanitize = require("sanitize-html");

// Init winston loggers (hi there)
const Log = require("./log.js");
Log.init();
const log = Log.log;

// Load ban list
const Ban = require("./ban.js");
Ban.init();
//var PeerServer = require('peer').PeerServer;

//var peerserver = PeerServer({ port: 2096, ssl: options, path: '/' });
/*
peerserver.on('connection', (key) => {
  keys.push(key);

  console.log('connected', keys);
});
peerserver.on('disconnect', (key) => {
  const index = keys.indexOf(key);
  if (index > -1) {
    keys.splice(index, 1);
  }
  console.log('disconnect', keys);
});
*/
// Start actually listening
server.listen(port, function () {
    console.log(" Welcome to BonziWORLD!\n", "Time to meme!\n", "----------------------\n", "Server listening at port " + port);
});
server2.listen(port2, function () {
    console.log("\nServer listening at port "+port2);
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(express.static(__dirname + "/public"));
// ========================================================================
// Banning functions
// ========================================================================

// ========================================================================
// Helper functions
// ========================================================================

const Utils = require("./utils.js");

// ========================================================================
// The Beef(TM)
// ========================================================================

const Meat = require("./meat.js");
Meat.beat();

// Console commands
const Console = require("./console.js");
Console.listen();

// ========================================================================
// BOTS -- DO NOT USE
// ========================================================================

// require('./cosmicbot.js');
// twats will use this for posting black people twerking
// require('./boombot.js');

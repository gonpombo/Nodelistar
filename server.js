"use strict";
var environment = require("./conf/environment.json")[process.env.NODE_ENV || "ic"];
var cluster = require('cluster'),
  numCPUs = require('os').cpus().length;

// --- Error Middleware ---
process.on('uncaughtException', function(err, stack) {
  console.log('[Process][' + (cluster.isMaster ? "MASTER" : "CHILDREN") + ':' + process.pid + '][Caught exception] Error: ' + err.stack);
  setTimeout(function(){
    process.exit(1);
  }, 1000);
});
// --- END Error Middleware ---

//Cluster Fork Settings.
if(cluster.isMaster) {
  for(var i = numCPUs; i--;) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
} else {
  // --- Requirements ---
  var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    multer = require("multer"),
    compression = require("compression"),
    errorhandler = require("errorhandler"),
    base = express(),
    server = require('http').Server(base).listen(environment.server.port),
    io = require("socket.io")(server, {path: environment.server.path + "/socket.io"});
  // --- END Requirements ---

  // --- App Middlewares ---
  var app = express();
  app.use(compression())
    .use(bodyParser.json({limit: '50mb'}))
    .use(bodyParser.urlencoded({limit: '50mb', extended: false}))
    .use(multer())
    .use(express.static(path.join(__dirname, "public")))
    .use(methodOverride())
  // --- END App Middlewares ---

  base.use(environment.server.path , app);

  // --- Database Connection Singleton ---.
  var Connector = require('./app/connector/MongoDB');
  var connector = new Connector();
  // --- END Database Connection ---.

  // --- Socket Web Service ---
  io.on('connection', function(socket) {
    console.log("Socket conected.");
  });
  // --- END Socket Web Service --- 

  // Route File with all Routes.
  require("./app/router/routes.js")(app);
}


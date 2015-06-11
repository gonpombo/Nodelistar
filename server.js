"use strict";
// var environment = require("./config/environment.json")[process.env.NODE_ENV || "ic"];
var cluster = require('cluster'),
  numCPUs = require('os').cpus().length;

process.addListener('uncaughtException', function(err, stack) {
  console.log('[Process][' + (cluster.isMaster ? "MASTER" : "CHILDREN") + ':' + process.pid + '][Caught exception] Error: ' + err);
  setTimeout(function(){
    process.exit(1);
  }, 1000);
});

if(cluster.isMaster) {
  for(var i = numCPUs; i--;) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
} else {
  // REQUIREMENTS
  var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    multer = require("multer"),
    compression = require("compression"),
    errorHandler = require("errorhandler"),
    base = express(),
    server = require('http').Server(base).listen(environment.server.port),
    io = require("socket.io")(server, {path: environment.server.path + "/socket.io"});
  // APP MIDDLEWARES
  var app = express();
  app.use(compression())
    .use(bodyParser.json({limit: '50mb'}))
    .use(bodyParser.urlencoded({limit: '50mb', extended: false}))
    .use(multer())
    .use(express.static(path.join(__dirname, "public")))
    .use(methodOverride());

  base.use(environment.server.path , app);
  // app.set('dbHandler', dbHandler);


  // io.adapter(redis({pubClient: publish, subClient: subscribe})).of("/SanLorenzo");
  io.on('connection', function(socket) {
    console.log("Socket conected.");
  });
  app.set("io", io); //Lo seteo en app, para obtenerlo desde el service, y poder mandar broadcast.

  // ROUTES
  require("./app/models/Person.js")(app);
}


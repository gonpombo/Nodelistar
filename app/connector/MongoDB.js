var MongoDB = (function() {
  //Private attributes.
  var Q = require("q"),
      MongoClient = require('mongodb').MongoClient,
      ObjectID = require("mongodb").ObjectID;

  //Private Methods.
  var databaseConnection = function(url) {
    var deferred = Q.defer();
    MongoClient.connect(url, function(err, db) {
      if(err) deferred.reject(err)
      else deferred.resolve(db);
    });
    return deferred.promise;
  };

  //Constructor.
  function MongoDB() {
    if(MongoDB.prototype._singletonInstance) {
      return MongoDB.prototype._singletonInstance;
    }
    MongoDB.prototype._singletonInstance = this;
    var mongo = require("../../conf/environment.json")[process.env.NODE_ENV || "ic"].database;
    this.database = databaseConnection(mongo.mongoUrl);
  }

  //Public methods.
  MongoDB.prototype.find = function (c, query, options, fields) {
    options = options || {}
    fields = fields || {}
    return this.database.then(function(db) {
      var op = Q.defer(),
        collection = db.collection(c);
      collection.find(query, fields, options).toArray(function(err, reply) {
        if(err) {
          console.log("Erorr trying to find in collection: " + c + "with this arguments: " + JSON.stringify(arguments) + ". Error: " + err);
          op.reject(err);
        } else {
          console.log("Find in collection: " + c + ", with fields: " + JSON.stringify(query) + ". Results: " + JSON.stringify(reply));
          op.resolve(reply)
        }
      });
      return op.promise;
    })
  }

  MongoDB.prototype.insert = function (c, data) {
    return this.database.then(function(db) {
      var op = Q.defer(),
        collection = db.collection(c);
      collection.insert(data, function(err, reply) {
        err ? op.reject(err) : op.resolve(reply);
      });
      return op.promise;
    });
  };

  MongoDB.prototype.delete = function (c, query) {
    return this.database.then(function(db) {
      var op = Q.defer(),
        collection = db.collection(c);
      collection.remove(query, function(err, reply) {
        err ? op.reject(err) : op.resolve(reply);
      });
      return op.promise;
    });
  };

  MongoDB.prototype.update = function (c, query, data) {
    return this.database.then(function(db) {
      var op = Q.defer(),
        collection = db.collection(c);
      collection.update(query, data, function(err, reply) {
        err ? op.reject(err) : op.resolve(reply);
      });
      return op.promise;
    });
  };

  return MongoDB;

})();

module.exports = MongoDB;
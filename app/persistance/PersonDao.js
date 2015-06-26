var PersonDao = (function () {
  var Connector = require('../connector/MongoDB');
  var connector = new Connector();
  var _ = require("lodash");

  function PersonDao() {
    this.table = "Person";
  }

  PersonDao.prototype.buildParams = function(params) {
    var response = {};
    _.each(params, function(val, key) {
      switch(key) {
        case "name":
        case "lastname":
          response[key] = val.toString();
          break;
        case "dni":
        case "age":
          response[key] = parseInt(val);
          break;
      }
    });
    return response;
  }
  
  PersonDao.prototype.find = function (params) {
    return connector.find(this.table, this.buildParams(params));
  };

  PersonDao.prototype.insert = function(person) {
    return connector.insert(this.table, person);
  };

  PersonDao.prototype.update = function(person) {
    return connector.update(this.table, {id: person.id}, person);
  };

  PersonDao.prototype.delete = function(id) {
    return connector.delete(this.table, {id: id});
  };

  return PersonDao;

})();

module.exports = PersonDao;

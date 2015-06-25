var PersonDao = (function () {
  var Connector = require('../connector/MongoDB');
  var connector = new Connector();
  function PersonDao() {
    this.table = "Person";
  }
  
  PersonDao.prototype.find = function (params) {
    return connector.find(this.table, params);
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

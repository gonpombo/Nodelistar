var connector = require('../connector/algunConector');
module.exports = {
  var PersonDao = (function () {
    function PersonDao() {
      var table = "Person"
    }
    
    PersonDao.prototype.find = function (params) {
      return connector.find(table, params);
    };

    PersonDao.prototype.insert = function(person) {
      return connector.insert(table, person);
    };

    PersonDao.prototype.update = function(person) {
      return.connector.update(table, person);
    };

    PersonDao.prototype.delete = function(id) {
      return.connector.delete(table, {id: id});
    };
    return PersonDao;
  })();
  return {PersonDao: PersonDao};
}

//Si es mongo, no hay que modificar mucho. Si es Mysql, crear la "query" Select from where.

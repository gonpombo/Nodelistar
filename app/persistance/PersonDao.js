var connector = require('../connector/algunConector');

var PersonDao = (function () {
    function PersonDao() {
      var table = "Person"
    }
    
    PersonDao.prototype.find = function (params) {
      return connector.find(table, params);
    };

    PersonDao.prototype.insert = function(params) {
      return connector.insert(table, params);
    }
    //Mismo con delete, update, create, etc.
    return PersonDao;
})();

//Si es mongo, no hay que modificar mucho. Si es Mysql, crear la "query" Select from where.

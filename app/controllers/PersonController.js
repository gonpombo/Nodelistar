var PersonController = (function () {
  var Person = require('../models/Person')
  var PersonDao = require('../persistance/PersonDao');
  var personDao = new PersonDao();
  var Q = require("q");
  function PersonController() {
  };
  
  PersonController.prototype.index = function () {
    var a = new Person({a: 1});
    return personDao.find({});
  };

  PersonController.prototype.show = function (id) {
    var p = Q.defer();
    Number(id) ? p.resolve(personDao.find({id: Number(id)})) : p.reject("Not a valid id")
    return p.promise;
  };

  PersonController.prototype.delete = function(id) {
    return personDao.delete({id: id})
  };

  PersonController.prototype.update = function(person) {
    var person = new Person(person);
    return personDao.update(person);
  };

  PersonController.prototype.create = function(person) {
    var p = Q.defer()
    var person = new Person(person);
    if (personValidator.isValid(person)) {
      p.resolve(personDao.create(person));
    } else {
      p.reject("Error while creating Person: " + person + ", with errors: " + personValidator.errors);
    }
    return p.promise;
  };
  return PersonController;
})();

module.exports = PersonController
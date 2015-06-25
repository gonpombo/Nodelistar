var PersonController = (function () {
  var Person = require('../models/Person'),
      PersonDao = require('../persistance/PersonDao'),
      personDao = new PersonDao(),
      PersonValidator = require('../validator/PersonValidator'),
      Q = require("q");
  function PersonController() {
  };
  
  PersonController.prototype.index = function () {
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
    var p = Q.defer(),
        person = new Person(person),
        personValidator = new PersonValidator();

    if (personValidator.isValid(person)) {
      p.resolve(personDao.insert(person));
    } else {
      p.reject("Error while creating Person: " + person + ", with errors: " + personValidator.errors);
    }

    return p.promise;
  };

  return PersonController;
})();

module.exports = PersonController
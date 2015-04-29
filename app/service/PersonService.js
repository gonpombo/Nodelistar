var personDao = require('../persistance/PersonDao');
var personValidator = require('../persistance/PersonValidator');

var PersonService = (function () {
    
    function PersonService() {}; 

    PersonService.prototype.index = function () {
      return personDao.find();
    };

    PersonService.prototype.show = function (id) {
      return personDao.find({id: id});
    };

    PersonService.prototype.create = function(person) {
    	if (personValidator.isValid(person)) {
        personDao.create(person);
      } else {
        console.log(personValidator.errors);
      }
    }
    //Mismo con delete, update, create, etc.
    return PersonService;
})();
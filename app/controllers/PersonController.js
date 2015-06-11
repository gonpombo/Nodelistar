var personService = require('../service/PersonService');
module.exports = {
	var PersonController = (function () {
    function PersonController() {}; 
    PersonController.prototype.index = function () {
      return personService.find();
    };
    PersonController.prototype.show = function (id) {
      return personService.find({id: id});
    };
    //Mismo con delete, update, create, etc.
    return PersonController;
	})();
}
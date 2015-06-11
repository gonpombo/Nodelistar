module.exports = {
  var PersonValidator = (function () {

    function PersonValidator() {
      var errors = [];
    };
    PersonValidator.prototype.isValid = function(person) {
      PersonValidator.validate(person);
      return errors.length == 0
    }

    PersonValidator.prototype.validate = function (person) {
      if(person.firstName !== person.lastName) {
        this.errors.push('Fisrt name & Last name must be different!.');
      }
      return errors;
    };

    return PersonValidator;
  })();  
}

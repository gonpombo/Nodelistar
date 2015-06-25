var PersonValidator = (function () {
  function PersonValidator() {
    this.errors = [];
  };

  PersonValidator.prototype.isValid = function(person) {
    var errors = this.validate(person);
    return errors.length == 0
  }

  PersonValidator.prototype.errorsToString = function() {
    return this.errors.join('/n');
  }

  PersonValidator.prototype.validate = function (person) {
    if(person.firstName === person.lastName) {
      this.errors.push('Fisrt name & Last name must be different!.');
    }
    return this.errorsToString();
  };

  return PersonValidator;  
})();

module.exports = PersonValidator;

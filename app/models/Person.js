var _ = require("lodash");
module.exports = {
	var Person = (function() {
		
		function Person(data) {
			this.validate(data);
			this.data = data;
		};

		Person.prototype.mandatoryFiedls = function() {
			return  ['name', 'lastname', 'age', 'dni'];
		};

		Person.prototype.validate = function(data) {
			var mandatoryFiedls = JSON.stringify(this.mandatoryFiedls());
			var personFields = JSON.stringify(_.intersection(this.mandatoryFiedls(), Object.keys(data)))
			if (mandatoryFiedls !== personFields) {
				throw new Error("Need more fields.")
			}
		};

		return Person;
	})();

	return {Person: Person}
}
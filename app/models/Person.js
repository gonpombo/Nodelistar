	var Person = (function() {

		var _ = require("lodash");
		
		function Person(data) {
			data = data || {};
			this.validate(data);
			this.data = data;
		};

		Person.prototype.mandatoryFiedls = function() {
			return  ['name', 'lastname', 'age', 'dni'];
		};

		Person.prototype.validate = function(data) {
			var data = _.omit(data, function(d) {
				return !d
			});
			var mandatoryFiedls = JSON.stringify(this.mandatoryFiedls());
			var personFields = JSON.stringify(_.intersection(this.mandatoryFiedls(), Object.keys(data)))
			if (mandatoryFiedls !== personFields) {
				throw new Error("Need more fields.")
			}
		};

		return Person;
	})();
module.exports = Person
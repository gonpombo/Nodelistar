var Person = (function() {

	// var _ = require("lodash");

	var errorField = function(msg) {
		throw new Error("Field: " + msg + " is obligatory.");
	}
	
	function Person(data) {
		data = data || {};
		this.name = data.name || errorField("Name");
		this.lastName = data.lastName || errorField("Last Name");
		this.age = data.age || errorField("Age");
		this.dni = data.dni || errorField("Dni");
		this.name = data.name || errorField("name");
		this.asd = data.asd || "";
	};

	// Person.prototype.mandatoryFiedls = function() {
	// 	return ['name', 'lastname', 'age', 'dni'];
	// };

	// Person.prototype.validate = function(data) {
	// 	var data = _.omit(data, function(d) {
	// 		return !d
	// 	});
	// 	var mandatoryFiedls = JSON.stringify(this.mandatoryFiedls());
	// 	var personFields = JSON.stringify(_.intersection(this.mandatoryFiedls(), Object.keys(data)))
	// 	if (mandatoryFiedls !== personFields) {
	// 		throw new Error("Need more fields.")
	// 	}
	// };

	return Person;
})();

module.exports = Person
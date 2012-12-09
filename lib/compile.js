// module dependencies
var util = require("util");

// expose compile
module.exports = compile;

// compile matching params and target
function compile(params, target) {
	if(typeof target.elements == "string") return target.elements;
	
	var parsed = "";

	target.keys.forEach(function(key, i) {
		parsed += target.elements[i];
		parsed += "/";

		if(params[key.name])
			parsed += params[key.name];
		else if(key.def)
			parsed += key.def;
		else if(!key.optional)
			throw new Error(util.format("express-redirect: missing the key `%s`. This should be impossible. Have you been doing weird stuff?", key.name));
	});

	if(target.elements.length > target.keys.length)
		parsed += target.elements[target.elements.length-1];

	return parsed;
}
// expose compile
module.exports = compile;

// compile a matching params and target
function compile(params, target) {
	if(typeof target.elements == "string") return target.elements;
	
	var parsed = "";

	target.keys.forEach(function(key, i) {
		parsed += target.elements[i];
		parsed += "/";
		parsed += key.name in params ? params[key.name] : key.def;
	});

	if(target.elements.length > target.keys.length)
		parsed += target.elements[target.elements.length-1];

	return parsed;
}
// module dependencies
var util = require("util");

// expose pecompiler
module.exports = precompile;

// pre-compile parsed route and target
function precompile(route, target) {
	// reindex route.keys
	var routeKeys = {};
	route.keys.forEach(function(key) {
		routeKeys[key.name] = key;
	});

	// compile target
	target.keys = target.keys.filter(function(key, i, keys) {
		// key is not present in route
		if(!(key.name in routeKeys)) {
			// key has no default and isn't optional
			if(!key.optional && typeof key.def == "undefined")
				throw new Error(util.format("express-redirect: `%s` isn't defined in your route. Make it optional or provide a default.", key.name));
			
			// key has a default
			if(typeof key.def == "string") {
				target.elements[i] += "/" + key.def;
				return false;
			}
			
			// key is optional
			if(key.optional) return false;
		}
		
		// key is present in route
		return true;
	});

	// join path, if all keys have been implemented
	if(target.keys.length == 0) target.elements = target.elements.join("");

	return target;
}
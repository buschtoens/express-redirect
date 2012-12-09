// module dependencies
var parsePath = require("./parsePath")
	, precompile = require("./precompile")
	, compile = require("./compile");

// expose redirect plugin
module.exports = plugin;

// mount the redirect method
function plugin(app) {
	app.redirect = redirect;
}

// app.redirect(route, target, status)
function redirect(route, target, status, method) {
	if(typeof status == "string") {
		var method = status
			, status = 302;
	}
	var status = status || 302
		, method = (method || "all").toLowerCase()
		, target = precompile(parsePath(route), parsePath(target));

	// register route
	this[method](route, function(req, res, next) {
		var compiled = compile(req.params, target);
		
		if(compiled != req.url) res.redirect(status, compiled);
		else next();
	});

	// chaining
	return this;
}
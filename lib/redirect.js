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
function redirect(route, target, status) {
	var status = status || 302
		, target = precompile(parsePath(route), parsePath(target));

	// register route
	this.all(route, function(req, res, next) {
		var compiled = compile(req.params, target);
		
		if(compiled != req.url) res.redirect(status, compiled);
		else next();
	});

	// chaining
	return this;
}
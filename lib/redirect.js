// module dependencies
var util = require("util")
	, parsePath = require("./parsePath")
	, precompile = require("./precompile")
	, compile = require("./compile");

// expose redirect plugin
module.exports = plugin;

// mount the redirect method
function plugin() {
	this.redirect = redirect;
}

// app.redirect(route, target, status)
function redirect(route, target, status) {
	var status = status || 302
		, target = precompile(parsePath(route), parsePath(target));

	// register route
	this.all(route, function(req, res, next) {
		res.redirect(status, compile(req.params, target));
	});
}
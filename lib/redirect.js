// module dependencies
var parsePath = require("./parsePath")
	, precompile = require("./precompile")
	, compile = require("./compile")
	, sanitize = require("sanitize-arguments");

// expose redirect plugin
module.exports = plugin;

// mount the redirect method
function plugin(app) {
	app.redirect = redirect;
	return app;
}

// app.redirect(route, target, status)
function redirect(route, target, status, method, check) {
	var args = sanitize(arguments, redirect, [[String, RegExp], ["/"], [302], ["all"], [Function, false]])
		, status = args.status
		, method = args.method.toLowerCase()
		, target = precompile(parsePath(args.route), parsePath(args.target))
		, check = args.check;
	
	// register route
	if(!check) {
		this[method](route, function(req, res, next) {
			var compiled = compile(req.params, target);
			
			if(compiled != req.url) res.redirect(status, compiled);
			else next();
		});
	} else {
		this[method](route, function(req, res, next) {
			var compiled = compile(req.params, target)
				, result = check(route, compiled, req, res);
			
			if(result === false) return next();
			else if(typeof result == "string") res.redirect(status, result);
			else if(compiled != req.url) res.redirect(status, compiled);
			else next();
		});
	}

	// chaining
	return this;
}

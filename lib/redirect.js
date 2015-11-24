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

// append the query string, if it exists
function appendQueryString(compiled, req) {
	var queryPos = req.url.indexOf("?");
	
	return ~queryPos
		? compiled + req.url.substr(queryPos)
		: compiled;
}

// app.redirect(route, target, status)
function redirect(route, target, status, method, qsa, check) {
	var args = sanitize(arguments, redirect, [[String, RegExp], ["/"], [302], ["all"], [false], [Function, false]])
		, status = args.status
		, method = args.method.toLowerCase()
		, target = precompile(parsePath(args.route), parsePath(args.target))
		, check = args.check
		, qsa = args.qsa;
	
	// register route
	if(!check) {
		this[method](route, function(req, res, next) {
			var compiled = compile(req.params, target);
			if(qsa) compiled = appendQueryString(compiled, req);
			
			if(compiled != req.url) res.redirect(status, compiled);
			else next();
		});
	} else {
		this[method](route, function(req, res, next) {
			var compiled = compile(req.params, target);
			if(qsa) compiled = appendQueryString(compiled, req);
			
			var result = check(route, compiled, req, res);
			
			if(result === false) return next();
			else if(typeof result == "string") res.redirect(status, result);
			else if(compiled != req.url) res.redirect(status, compiled);
			else next();
		});
	}

	// chaining
	return this;
}

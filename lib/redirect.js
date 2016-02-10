// module dependencies
var parsePath  = require("./parsePath"),
    precompile = require("./precompile"),
    compile    = require("./compile"),
    sanitize   = require("sanitize-arguments");

// expose redirect plugin
module.exports = plugin;
var application;

// mount the redirect method
function plugin(app) {
    application = app;

    app.redirect = redirect;
    app.multiRedirect = multiRedirect;
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
    var args = sanitize(arguments, redirect, [[String, RegExp], ["/"], [302], ["all"], [false], [Function, false]]);
    status = args.status;
    method = args.method.toLowerCase();
    target = precompile(parsePath(args.route), parsePath(args.target));
    check  = args.check;
    qsa    = args.qsa;

    // register route
    if(!check) {
        application[method](route, function(req, res, next) {
            var compiled = compile(req.params, target);
            if(qsa) compiled = appendQueryString(compiled, req);

            if(compiled != req.url) res.redirect(status, compiled);
            else next();
        });
    } else {
        application[method](route, function(req, res, next) {
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
    return application;
}

// app.multiRedirect([{route:"/foo", target:"/bar", status: 302}, {...}, {...}])
function multiRedirect(redirects) {
    redirects.map(function(data){
        redirect(data.route, data.target, data.status, data.method, data.qsa, data.check)
    });

    // chaining
    return application;
}

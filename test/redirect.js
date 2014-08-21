// get the lib and express
var redirect = require("../")
	, express = require("express");

describe("plugin testing", function() {
	// configure express server
	var app = express();
	app.configure(function() {
		app.set("port", process.env.PORT || 3000);
		app.use(app.router);
		
		// mount express-redirect
		describe("mount plugin", function() {
			redirect(app);
			it("register redirect method", function() {
				app.redirect
					.should.be.a("function");
			});
		});
	});
	
	// start express server
	app.listen(app.get("port"), function() {
		console.log("Express server listening on port " + app.get("port"));
	});
	
	describe("app.redirect", function() {
		it("return app for chaining", function() {
			app.redirect("test", "test")
				.should.equal(app);
		});
	});
	
	// define test redirections
	app.redirect("/test1/lorem/ipsum", "/test1/dolor/sit");
	app.redirect("/test2/lorem/ipsum", "/test2/dolor/sit", 301);
});
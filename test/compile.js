// get the lib
var parsePath = require("../lib/parsePath.js")
	, precompile = require("../lib/precompile.js")
	, compile = require("../lib/compile.js");

// fixtures
var fixtures = require("./fixtures/compile.json");

// tests
describe("compile(params, target)", fixtures.forEach.bind(fixtures, function(testcase) {
	describe(testcase.test, function() {
		it(testcase.should, function() {
			var target = precompile(parsePath(testcase.route), parsePath(testcase.target));

			if(!testcase.throws) {
				var compiled = compile(testcase.params, target);

				// JSON undefined polyfill
				for(var key in testcase.keys)
					if("def" in testcase.keys[key])
						testcase.keys[key].def = testcase.keys[key].def || undefined;
				
				compiled
					.should.be.a("string")
					.and.equal(testcase.compiled);
			} else {
				compile.bind(testcase.params, target)
					.should.throw();
			}
		});
	});
}));
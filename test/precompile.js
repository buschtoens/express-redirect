// get the lib
var parsePath = require("../lib/parsePath.js")
	, precompile = require("../lib/precompile.js");

// fixtures
var fixtures = require("./fixtures/precompile.json");

// tests
describe("precompile(route, target)", fixtures.forEach.bind(fixtures, function(testcase) {
	describe(testcase.test, function() {
		it(testcase.should, function() {
			if(!testcase.throws) {
				var precompiled = precompile(parsePath(testcase.route), parsePath(testcase.target));
				
				// JSON undefined polyfill
				for(var key in testcase.keys)
					if("def" in testcase.keys[key])
						testcase.keys[key].def = testcase.keys[key].def || undefined;
				
				precompiled
					.should.be.a("object")
					.and.have.keys("keys", "elements");
				
				precompiled.elements
					.should.eql(testcase.elements);
				
				precompiled.keys
					.should.be.an.instanceOf(Array)
					.and.eql(testcase.keys);
			} else {
				precompile.bind(parsePath(testcase.route), parsePath(testcase.target))
					.should.throw();
			}
		});
	});
}));
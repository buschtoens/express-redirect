// get the lib
var parsePath = require("../lib/parsePath.js");

// fixtures
var fixtures = require("./fixtures/parsePath.json");

// tests
describe("parsePath(path)", fixtures.forEach.bind(fixtures, function(testcase) {
	describe(testcase.test, function() {
		it(testcase.should, function() {
			var parsed = parsePath(testcase.path);
			
			// JSON undefined polyfill
			for(var key in testcase.keys)
				if("def" in testcase.keys[key])
					testcase.keys[key].def = testcase.keys[key].def || undefined;
			
			parsed
				.should.be.a("object")
				.and.have.keys("keys", "elements");
			
			parsed.elements
				.should.be.an.instanceOf(Array)
				.and.eql(testcase.elements);
			
			parsed.keys
				.should.be.an.instanceOf(Array)
				.and.eql(testcase.keys);
		});
	});
}));
// expose parser
method.exports = parsePath;

// breaks a path into its elements and keys
function parsePath(path) {
	var keys = []
		, elements = []
		, after = "";
	
	// RegExp based on TJ Holowaychuk's pathRegexp
	// https://github.com/visionmedia/express/blob/master/lib/utils.js#L268
	path.replace(/(.*?)((?:\/)?:(\w+)(?:\((.*?)\))?(\?)?)/g, function(_, before, whole, key, def, optional, offset, path) {
		keys.push({ name: key, optional: !!optional, def: def });
		elements.push(before);
		after = path.substr(path.indexOf(whole) + whole.length);
	});
	if(after) elements.push(after);
	
	return { keys: keys, elements: elements };
}
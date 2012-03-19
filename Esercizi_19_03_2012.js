var apply = function(args) {
	return args[0](args[1]);
}

var aa = function(f) {
	return function(args) {
		return args.map(f)
	}
}

var comp2 = function(args) {
	return function(x) {
		return args[0](args[1](x));
	}
}

var comp = function(args) {
	return function(x) {
		var result = x;
		for (var j = args.length-1; j >= 0; j--)
			result = args[j](result);
		return result;
	}
}
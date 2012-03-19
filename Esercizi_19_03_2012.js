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
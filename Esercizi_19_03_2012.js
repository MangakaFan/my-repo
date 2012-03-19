// funzione apply con un array
var apply = function(args) {
	return args[0](args[1]);
};

// apply to all
var aa = function(f) {
	return function(args) {
		return args.map(f)
	};
};

// composizione di 2 funzioni -> f(g(x))
var comp2 = function(args) {
	return function(x) {
		return args[0](args[1](x));
	};
};

// composizione di n funzioni (con for)
var comp = function(args) {
	return function(x) {
		var result = x;
		for (var j = args.length-1; j >= 0; j--)
			result = args[j](result);
		return result;
	};
};

// composizione con n funzioni (con reduce)
var comp = function(args) {
	return function(x) {
		return args.reduce(comp2);
	};
};
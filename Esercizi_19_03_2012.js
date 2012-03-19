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

// ritorna l'array dei risultati delle singole funzioni (con for)
var cons = function(args) {
	return function(x) {
		var a = new Array();
		for (var i = 0; i < args.length; i++)
			a.push(args[i](x));
		return a;
	};
};


// ritorna l'array dei risultati delle singole funzioni (con map)
var cons = function(args) {
	return function(x) {
		return args.map(function(item) {
			return item(x);
		});
	};
};

//distribuisce a sinistra (con for)
var distl = function(args) {
	var a = new Array();
	for (var i = 0; i < args[1].length; i++) {
		var b = new Array();
		b.concat(args[0]);
		b.concat(args[1][i]);
		a.push(b);
	}
	return a;
};


//distribuisce a sinistra (con map)
var distl = function(args) {
	var value = args[0];
	var array = args[1];
	return array.map(function(item) {
		return [value, item];
	});
};

// trasposta di una matrice (scambio righe per colonne)
var trans = function(args) {
	var a = new Array();
	for (var i = 0; i < args[0].length; i++) {
		var b = new Array();
		for (var j = 0; j < args.length; j++)
			b.push(args[i][j]);
		a.push(b);
	}			
};
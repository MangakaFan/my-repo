var Solid = function (l,p,h,x,y,z) {
	return T([0,1,2])([x,y,z])(
		SIMPLEX_GRID([
			[l],
			[p],
			[h]
		]));
};

//				  l		p		h		x		y		z
var w1 = 	Solid(0.74,	0.2,	3,		0,		0,		0);
var w2 = 	Solid(0.2,	1.95,	3,		0.54,	0,		0);
var w3 = 	Solid(1.19,	0.3,	3,		0.54,	1.95,	0);
var w4 = 	Solid(0.82,	0.11,	2.56,	1.73,	2.14,	0);
var w4_2 = 	Solid(0.82,	0.3,	0.44,	1.73,	1.95,	2.56);
var w5 = 	Solid(0.2,	0.29,	3,		2.55,	1.96,	0);
var w6 = 	Solid(0.1,	1.035,	2.17,	2.65,	0.925,	0);
var w6_2 = 	Solid(0.2,	1.035,	0.83,	2.55,	0.925,	2.17);
var w7 =	Solid(0.2,	1.195,	3,		2.55,	-0.27,	0);
var w8 =	Solid(0.435,0.9,	3,		2.315,	-1.17,	0);
var w9 = 	Solid(0.2,	0.74,	3,		2.55,	-1.91,	0);
var walls = STRUCT([w1,w2,w3,w4,w4_2,w5]);

//				  l		p		h		x		y		z
var f1 = 	Solid(0.42,	1.8,	0.74,	0.8,	0,		0);
var f2 = 	Solid(0.635,0.31,	2.54,	1.745,	1.83,	0);
var f3 = 	Solid(0.17,	0.1,	1.73,	2.38,	2.04,	0.47);
var furnitures = STRUCT([f1,f2,f3]);

//				  l		p		h		x		y		z
var l1 =	Solid(0.22,	1.935,	0.022,	0.74,	0.015,	1.26);
var l2 = 	Solid(0.22,	0.968,	0.022,	0.74,	0.04,	2.102);
var l3 = 	Solid(0.22,	0.967,	0.022,	0.74,	0.983,	1.782);
var l4 = 	Solid(0.92,	0.2,	0.028,	0.74,	1.75,	2.085);
var l5 = 	Solid(0.58,	0.31,	0.028,	0.74,	1.64,	1.52);
var l6 = 	Solid(0.34,	0.31,	0.028,	1.295,	1.64,	1.2);
var l7 =	Solid(0.12,	0.025,	0.2,	0.84,	0.983,	1.804);


var libraries = STRUCT([l1,l2,l3,l4,l5,l6,l7]);


var model = STRUCT([walls,furnitures,libraries]);
DRAW(model);
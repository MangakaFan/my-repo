var Wall = function (l,p,x,y) {
	return T([0,1])([x,y])(
		SIMPLEX_GRID([
			[l],
			[p],
			[2.7]
		]));
};
var w1 = R([2])([-PI/4])(Wall(0.91,0.4,0,0));
var w2 = R([2])([-PI/4])(Wall(2.09,0.4,2.68,0));
var w3 = R([2])([PI/4])(Wall(1.58,0.2,0,0));
var w4 = Wall(0.2,1.88,0.917,1.117);
var w5 = Wall(1.7,0.2,1.117,2.797);
var w6 = Wall(0.2,0.68,2.617,2.797);
var w7 = Wall(0.24,0.2,2.817,3.277);
var w8 = Wall(2.04,0.2,4.217,3.277);

var w9 = Wall(0.1,2.6,4.457,0.677);
var w10 = Wall(0.8,0.1,4.457,0.677);
var w11 = Wall(0.1,2.6,6.157,0.677);

var w12 = Wall(3.56,0.2,6.257,1.207);
var w13 = Wall(0.2,4.68,9.617,-3.473);
var w14 = Wall(1.46,0.4,8.357,-3.873);

var w15 = Wall(1.33,0.4,5.257,-3.873);

var walls = STRUCT([w1,w2,w3,w4,w5,w6,w7,w8,w9,w10,w11,w12,w13,w14,w15]);

var model = STRUCT([walls]);
DRAW(model);
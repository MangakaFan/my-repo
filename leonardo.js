//restituisce un segmento lungo 'l' centrato nelle coordinate (x, y)
//inclinato dell'angolo 'a'
var Segment = function(l, a, x, y) {
	var domain = DOMAIN([[0,l]])([1]);
	var mapping = function(p) {
    	var u = p[0] * COS(a) + x - l/2 * COS(a);
    	var v = p[0] * SIN(a) + y - l/2 * SIN(a);
    	return [u, v];  
	};
	return MAP(mapping)(domain);
};

//restituisce un semicerchio di raggio 'r' centrato nelle coordinate (x, y)
//e di ampienza 'a'
var SemiCircle = function(r, a, x, y) {
	var domain = DOMAIN([[0,a]])([360]);
	var mapping = function(p) {
    	var u = r * COS(p[0]) + x;
    	var v = r * SIN(p[0]) + y;
    	return [u, v];  
	};
	return MAP(mapping)(domain);
};

//restituisce un cerchio di raggio 'r' centrato nelle coordinate (x, y)
var Circle = function(r, x, y) {
 	var domain = DOMAIN([[0,2*PI]])([360]);
  	var mapping = function(p) {
    	var u = r * COS(p[0]) + x;
    	var v = r * SIN(p[0]) + y;
    	return [u, v];  
  	};
  	return MAP(mapping)(domain);
};

//restituisce un cilindro di raggio 'r' ampiezza 'a' e altezza 'h'
//centrato nelle coordinate (x, y)
var SemiCylinder = function(r, a, h, x, y) {
    var domain = DOMAIN([[0,a],[0,h]])([360,1]);
    var mapping = function(p) {
      u = r * COS(p[0]) + x;
      v = r * SIN(p[0]) + y;
      w = p[1];
      return [u, v, w];
    }
    return MAP(mapping)(domain);
}

var c1 = new Circle(1,0,0);
var c2 = new Circle(5,0,0);
var c3 = new Circle(9,0,0);
var circles = STRUCT([c1,c2,c3]);

var r1 = new Segment(20,	PI/2,	1,		0);
var r2 = new Segment(20,	PI/2,	2.5,	0);
var r3 = new Segment(20,	PI/2,	-1,		0);
var r4 = new Segment(20,	PI/2,	-2.5,	0);

var r5 = new Segment(20,	0,	0,		1);
var r6 = new Segment(20,	0,	0,		2.5);
var r7 = new Segment(20,	0,	0,		-1);
var r8 = new Segment(20,	0,	0,		-2.5);

var r9 = new Segment(20,	PI/4,	SQRT(2)/2,		-SQRT(2)/2);
var r10 = new Segment(20,	PI/4,	1.75,		      -1.75);
var r11 = new Segment(20,	PI/4,	-SQRT(2)/2,		SQRT(2)/2);
var r12 = new Segment(20,	PI/4,	-1.75,		    1.75);

var r13 = new Segment(20, 3*PI/4, -SQRT(2)/2,     -SQRT(2)/2);
var r14 = new Segment(20, 3*PI/4, -1.75,          -1.75);
var r15 = new Segment(20, 3*PI/4, SQRT(2)/2,      SQRT(2)/2);
var r16 = new Segment(20, 3*PI/4, 1.75,           1.75);

var rects = STRUCT([r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16]);

var plane = COLOR([0.2,0.2,0.2])(STRUCT([circles, rects]));
DRAW(plane);


var cube = CUBOID([1,2,3]);
var rotatedCube = ROTATE(2)(PI/4)(cube);
DRAW(rotatedCube);

var cube = CUBOID([1,2,3]);
var rotatedCube = SCALE([0,1,2]])([1,2,3])(cube);
DRAW(rotatedCube);

var model = SIMPLEX_GRID([REPLICA(100)([2,-2]),REPLICA(100)([2,-2]),REPLICA(100)([2,-2])]);
DRAW(model);
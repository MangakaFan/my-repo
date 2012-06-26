var manici = [[0,0],[10,0],[0,10],[10,10]];
var dominio = INTERVALS(1)(30);
var curva = CUBIC_HERMITE(S0)(manici);
var out = MAP(curva)(dominio);
DRAW(out);

var manici = [[0,0],[10,0],[1,1],[1,1]];
var dominio = INTERVALS(1)(30);
var curva = CUBIC_HERMITE(S0)(manici);
var out = MAP(curva)(dominio);
DRAW(out);

var r = POLYLINE([[10,0],[10,2]]);
DRAW(r);



var b1 = BEZIER(s0)([[0,0],[1,1]]);
var b2 = BEZIER(s0)([[0,0],[0.5,0],[1,1]]);

//produco insieme sia la curva che il poligono di controllo
//CONS = CONSTRUCTION
//q = array di punti di controllo
var c1 = STRUCT(CONS([POLYLINE,BEZIER(s0)])(q));

/*
console.log('test');

var load = function (id, n) {
  var url = "https://raw.github.com/cvdlab-cg/" + id 
    + "/master/2012-04-03/exercise" + n + ".js";

  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);

  return url;
};
*/

//funzione per creare pezzi di circonferenza di ampiezza 'a' e con raggio 'r'
var SemiCircle = function(r, a) {
	var domain = DOMAIN([[0,a]])([a*PI/180]);
	var mapping = function(p) {
    	var u = r * COS(p[0]);
    	var v = r * SIN(p[0]);
    	return [u, v];  
	};
	return MAP(mapping)(domain);
};

//crea una porione di cilindro  con raggio 0.25 di base 'b' e altezza 'h'
//lo posiziona ad altezza 'z' e lo ruota dell'angolo 'a'
var SemiCylinder = function(r, b, h, z, a) {
	return R([0,1])([a])(T([2])([z])(EXTRUDE([h])(SemiCircle(r,b/r))));
};

/* CORPO PRINCIPALE */
var c1 = SemiCylinder(0.25, 2*PI*0.25,		0.015,	0,		0);
var c2 = SemiCylinder(0.25, 2*PI*0.25-0.15,	0.075,	0.115,	0);
var c3 = SemiCylinder(0.25, 2*PI*0.25-0.1,	0.48,	0.17,	1.2);
var c4 = SemiCylinder(0.25, 0.1,				0.16,	0.49,	0.8);
var c5 = SemiCylinder(0.25, 0.025,			0.1,	0.015,	0);
var c6 = SemiCylinder(0.25, 0.025,			0.1,	0.015,	0.7);
var c7 = SemiCylinder(0.25, 2*PI*0.25-0.45,	0.1,	0.015,	1.2);
var corpo_principale = COLOR([1,1,1])(STRUCT([c1,c2,c3,c4,c5,c6,c7]));

/* DETTAGLI DEL CORPO */
//costruisce un quadrato di base 'b' e altezza 'h' su di un cilindro di raggio 0.2505
//lo posiziona ad altezza 'z' e lo ruota dell'angolo 'a'
var DetQuad = function(r, s, b, h, z, a) {
	var b1 = EXTRUDE([s])(SemiCircle(r,b/r));
	var b2 = T([2])([h-s])(EXTRUDE([s])(SemiCircle(r,b/r)));
	var h1 = EXTRUDE([h-s])(SemiCircle(r,s/r));
	var h2 = R([0,1])([b/r-s/r])(EXTRUDE([h-s])(SemiCircle(r,s/r)));
	return R([0,1])([a])(T([2])([z])(STRUCT([b1,b2,h1,h2])));
}

var dc1 = DetQuad(0.2505, 0.002,  0.075,	0.1,	0.015,	1.3);
var dc2 = DetQuad(0.2505, 0.002,  0.05,		0.1,	0.015,	1.66);
var dc3 = DetQuad(0.2505, 0.002,  0.05,		0.1,	0.015,	1.92);
var dc4 = DetQuad(0.2505, 0.002,  0.15,		0.1,	0.015,	0.1);
var dc5 = DetQuad(0.2505, 0.002,  0.15,		0.1,	0.39,	0.1);
var dc6 = DetQuad(0.2505, 0.002,  0.075,	0.19,	0.19,	0.4);
var dc7 = DetQuad(0.2505, 0.002,  0.15,		0.3,	0.19,	1.3);
var dc8 = DetQuad(0.2505, 0.002,  0.125,	0.035,	0.135,	0.75);
var dc9 = DetQuad(0.2505, 0.002,  0.125,	0.035,	0.135,	1.4);
var dc10 = DetQuad(0.2505, 0.002, 0.06,	0.035,	0.135,	0.3);
var dc11 = DetQuad(0.2505, 0.002, 0.45,	0.15,	0.5,	0.1);
var dc12 = DetQuad(0.2505, 0.002, 0.45,	0.075,	0.55,	0.1);
var dc13 = DetQuad(0.2505, 0.002, 0.15, 0.155,  0.015,  -0.6);
var dc14 = DetQuad(0.2505, 0.002, 0.1, 0.4, 0.19, -0.4);
var dc15 = DetQuad(0.2505, 0.002, 0.1, 0.4, 0.19, 1.96);
var dettagli_corpo = STRUCT([dc1,dc2,dc3,dc4,dc5,dc6,dc7,dc8,dc9,dc10,dc11,dc12,dc13,dc14,dc15]);

/* DETTAGLI IN RILIEVO DEL CORPO */
var Disk = function(r, b) {
    var domain = DOMAIN([[0,b/r],[0,r]])([b/r*PI/180,1]);
    var mapping = function(p) {
      var u = p[1] * COS(p[0]);
      var v = p[1] * SIN(p[0]);
      return [u, v, 0];  
    }
    return MAP(mapping)(domain);
}
var CylinderRect = function(r, b, h, z, a) {
  var d1 = Disk(r,b);
  var d2 = T([2])([h])(Disk(r,b));
  var p1 = EXTRUDE([h])(POLYLINE([[0,0],[r,0]]));
  var p2 = R([0,1])([b/r])(p1);
  return R([0,1])([a])(T([2])([z])(STRUCT([d1,d2,p1,p2])));
}

var grigio = [0.6,0.6,0.6];
var blu = [0,150/255,1];

var db1 = SemiCylinder(0.2505,0.4,0.03,0.51,0.18);
var db2 = SemiCylinder(0.2505,0.4,0.03,0.56,0.18);
var db3 = SemiCylinder(0.2505,0.4,0.03,0.62,0.18);
var db = COLOR(blu)(STRUCT([db1,db2,db3]));

var dr1 = SemiCylinder(0.25,  0.06,	  0.015,	0.015,	0.16);
var dr2 = SemiCylinder(0.25,  0.06,	  0.015,	0.1,    0.16);
var dr3 = SemiCylinder(0.25,  0.025,	0.1,    0.015,	0.1);
var dr4 = SemiCylinder(0.25,  0.075,	0.1,    0.015,	0.4);
var cr1 = CylinderRect(0.25,  0.05,   0.07,   0.03,   0.2);
var pi1 = SemiCylinder(0.24,0.05,0.07,0.03,0.2);
var placca1 = COLOR(grigio)(STRUCT([dr1,dr2,dr3,dr4,cr1,pi1]));

var dr5 = SemiCylinder(0.25,  0.15,     0.01425,  0.15575,  -0.6);
var dr6 = SemiCylinder(0.25,  0.15,     0.01425,  0.05925,  -0.6);
var dr7 = SemiCylinder(0.25,  0.15,     0.01425,  0.015,    -0.6);
var dr8 = SemiCylinder(0.25,  0.01425,  0.155,    0.015,    -0.6);
var dr9 = SemiCylinder(0.25,  0.01425,  0.155,    0.015,    -0.057);
var dr10 = SemiCylinder(0.25, 0.0135,   0.08225,  0.0735,   -0.489);
var dr11 = SemiCylinder(0.25, 0.0135,   0.08225,  0.0735,   -0.381);
var dr12 = SemiCylinder(0.25, 0.0135,   0.08225,  0.0735,   -0.273);
var dr13 = SemiCylinder(0.25, 0.0135,   0.08225,  0.0735,   -0.165);
var cr2 = CylinderRect(0.25,  0.1215,   0.03,     0.02925,  -0.543);
var cr3 = CylinderRect(0.25,  0.0135,   0.08225,  0.0735,   -0.543);
var cr4 = CylinderRect(0.25,  0.0135,   0.08225,  0.0735,   -0.435);
var cr5 = CylinderRect(0.25,  0.0135,   0.08225,  0.0735,   -0.327);
var cr6 = CylinderRect(0.25,  0.0135,   0.08225,  0.0735,   -0.219);
var cr7 = CylinderRect(0.25,  0.0135,   0.08225,  0.0735,   -0.111);
var pi2 = SemiCylinder(0.24,  0.1215,   0.03,     0.02925,  -0.543);
var pi3 = SemiCylinder(0.24,  0.1215,   0.08225,  0.0735,   -0.543);
var p21 = COLOR(grigio)(STRUCT([dr5,dr6,dr7,dr8,dr9,dr10,dr11,dr12,dr13,cr2,cr3,cr4,cr5,cr6,cr7,pi2]));
var p22 = COLOR(blu)(STRUCT([pi3]));
var placca2 = STRUCT([p21,p22]);

var cr8 = CylinderRect(0.255,0.05,0.015,0.19,0.1);
var cr9 = CylinderRect(0.255,0.04,0.005,0.195,0.12);
var dr14 = DetQuad(0.255,0.005,0.05,0.015,0.19,0.1);
var p31 = STRUCT([cr8,cr9,dr14]);
var p32 = T([2])([0.035])(p31);
var p33 = T([2])([0.035])(p32);
var p34 = T([2])([0.035])(p33);
var p35 = T([2])([0.035])(p34);
var p36 = T([2])([0.035])(p35);
var placca3 = COLOR(grigio)(STRUCT([p31,p32,p33,p34,p35,p36]));

var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([[0,1],[0,1]])([10,20]);
var c1 = CUBIC_HERMITE(S0)([[0,0,0],[0,0.05,0.05],[0,0.082,0],[0,0,0.082]]);
var c2 = CUBIC_HERMITE(S0)([[0,0,0],[0,0.05,0],[0,0,0],[0,0,0]]);
var c3 = CUBIC_HERMITE(S0)([[0,0.05,0],[0,0.05,0.05],[0,0,0],[0,0,0]]);
var s1 = BEZIER(S1)([c1,c2,c3]);
var surf11 = MAP(s1)(domain2);
var surf12 = S([1])([-1])(surf11);
var surf13 = T([2])([0.1])(S([2])([-1])(surf11));
var surf14 = T([2])([0.1])(S([2])([-1])(surf12));
var surf1 = COLOR(blu)(T([0,2])([0.245,0.015])(STRUCT([surf11,surf12,surf13,surf14])));
var c4 = CUBIC_HERMITE(S0)([[-0.03,0,0],[-0.03,0.05,0.05],[0,0.082,0],[0,0,0.082]]);
var s2 = BEZIER(S1)([c1,c4]);
var surf21 = MAP(s2)(domain2);
var surf22 = S([1])([-1])(surf21);
var surf23 = T([2])([0.1])(S([2])([-1])(surf21));
var surf24 = T([2])([0.1])(S([2])([-1])(surf22));
var surf2 = COLOR(grigio)(T([0,2])([0.245,0.015])(STRUCT([surf21,surf22,surf23,surf24])));
var c5 = CUBIC_HERMITE(S0)([[0.03,0,0.04],[0.03,0.01,0.05],[0,0.018,0],[0,0,0.018]]);
var s3 = BEZIER(S1)([c1,c5]);
var surf31 = MAP(s3)(domain2);
var surf32 = S([1])([-1])(surf31);
var surf33 = T([2])([0.1])(S([2])([-1])(surf31));
var surf34 = T([2])([0.1])(S([2])([-1])(surf32));
var surf3 = COLOR(grigio)(T([0,2])([0.215,0.015])(STRUCT([surf31,surf32,surf33,surf34])));
var c6 = CUBIC_HERMITE(S0)([[0.03,0,0.04],[0.03,-0.01,0.05],[0,-0.018,0],[0,0,0.018]]);
var s4 = BEZIER(S1)([c5,c6]);
var surf41 = MAP(s4)(domain2);
var surf42 = T([2])([0.1])(S([2])([-1])(surf41));
var surf4 = COLOR(blu)(T([0,2])([0.215,0.015])(STRUCT([surf41,surf42])));
var d1 = COLOR([1,1,1])(R([0,1])([-0.2])(T([2])([0.015])(Disk(0.25,0.1))));
var d2 = COLOR([1,1,1])(R([0,1])([-0.2])(T([2])([0.115])(Disk(0.25,0.1))));
var placca4 = STRUCT([surf1,surf2,surf3,surf4,d1,d2]);

var Placca5 = function() {  
  var c1 = CUBIC_HERMITE(S0)([[0,0,0.005],[0,0.04,0.075],[0,0.14,0],[0,0,0.05]]);
  var c2 = CUBIC_HERMITE(S0)([[0,0,0],[0,0.05,0],[0,0,0],[0,0,0]]);
  var c3 = CUBIC_HERMITE(S0)([[0,0.05,0.075],[0,0.05,0],[0,0,0],[0,0,0]]);
  var c4 = CUBIC_HERMITE(S0)([[0,0,0.015],[0,0.03,0.075],[0,0.1,0],[0,0,0.05]]);
  var c5 = CUBIC_HERMITE(S0)([[-0.04,0,0.005],[-0.04,0.04,0.075],[0,0.14,0],[0,0,0.05]]);
  var c6 = CUBIC_HERMITE(S0)([[-0.04,0,0.015],[-0.04,0.03,0.075],[0,0.1,0],[0,0,0.05]]);
  var c7 = CUBIC_HERMITE(S0)([[0,0.05,0.075],[0,0.04,0.075],[0,0,0],[0,0,0]]);
  var s1 = BEZIER(S1)([c3,c7]);
  var s2 = BEZIER(S1)([c1,c2]);
  var surf1 = COLOR(blu)(STRUCT([MAP(s1)(domain2),MAP(s2)(domain2)]));
  var s3 = BEZIER(S1)([c1,c4]);
  var surf2 = COLOR([1,1,1])(T([0])([0.01])(MAP(s3)(domain2)));
  var s4 = BEZIER(S1)([c1,c5]);
  var surf3 = COLOR([1,1,1])(T([0])([0.01])(MAP(s4)(domain2)));
  var s5 = BEZIER(S1)([c4,c6]);
  var surf4 = COLOR([1,1,1])(T([0])([0.01])(MAP(s5)(domain2)));
  var p51 = STRUCT([surf1,surf2,surf3,surf4]);
  var p52 = S([1])([-1])(p51);
  var p53 = T([2])([0.15])(R([1,2])([PI])(p51));
  var p54 = S([1])([-1])(p53);
  return STRUCT([p51,p52,p53,p54]);
}
var d3 = COLOR([1,1,1])(R([0,1])([-0.2])(T([2])([0.19])(Disk(0.25,0.1))));
var d4 = COLOR([1,1,1])(R([0,1])([-0.2])(T([2])([0.49])(Disk(0.25,0.1))));
var sm1 = SemiCylinder(0.22,0.1,0.3,0.19,-0.2);
var pl1 = COLOR([1,1,1])(EXTRUDE([0.15])(POLYLINE([[-0.005,0.015],[-0.005,0.05]])));
var pl2 = COLOR([1,1,1])(EXTRUDE([0.15])(POLYLINE([[-0.005,-0.015],[-0.005,-0.05]])));
var pl3 = COLOR(grigio)(T([0])([0.005])(R([0,2])([-PI/4])(EXTRUDE([0.03])(POLYLINE([[0,-0.015],[0,0.015]])))));
var t = T([2])([0.025]);
var placca5 = T([0,2])([0.245,0.19])(STRUCT([Placca5(),pl1,pl2,t,pl3,t,pl3,t,pl3,t,pl3]));

var pl4 = COLOR(grigio)(T([0])([0.005])(R([0,2])([-PI/4])(EXTRUDE([0.03])(POLYLINE([[0,-0.03],[0,0.03]])))));
var placca6 = T([0,2])([0.245,0.34])(STRUCT([Placca5(),t,pl4,t,pl4,t,pl4,t,pl4]));

var dettagli_rilievo = STRUCT([db,placca1,placca2,placca3]);

var sm2 = COLOR(grigio)(SemiCylinder(0.25,2*PI*0.25,0.3,0.65,0));
var sm3 = COLOR(blu)(SemiCylinder(0.25,2*PI*0.25,0.2,0.68,0));

var corpo_base = R([0,1])([-1])(STRUCT([corpo_principale,dettagli_corpo,dettagli_rilievo,sm2,sm3]));
var griglie = STRUCT([placca4,placca5,placca6,d3,d4,sm]);
var corpo = S([2])([0.9])(STRUCT([corpo_base,griglie]));

/* TESTA */

var SemiSphere = function(r) {
  var domain = DOMAIN([[0,2*PI],[0,PI/2]])([360,90]);
  var mapping = function(p) {
    u = r * COS(p[1]) * COS(p[0]);
    v = r * COS(p[1]) * SIN(p[0]);
    w = r * SIN(p[1]);
    return [u, v, w];
  }
  return MAP(mapping)(domain);
}

var t1 = COLOR(grigio)(SemiSphere(0.25));

var testa = T([2])([0.63])(STRUCT([t1]));

var r2d2 = STRUCT([corpo,testa]);
DRAW(r2d2);
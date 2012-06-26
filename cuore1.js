/*
Spessore legno : 0.02
Rettangoli : 0.6 x 0.6
Libreria : 0.86 x 0.76 x 0.15 (langhezza x altezza x profondità)
*/
var spes = 0.02;
var prof = 0.15;

var Triangolo = function (punti) {
  var domain = DOMAIN([[0,1],[0,1]])([10,10]);
  var p0 = punti[0];
  var p1 = punti[1];
  var p2 = punti[2];
  var p3 = punti[3] || [0,0,0];  
  var c1 = CUBIC_HERMITE(S0)([p0,p1,[0,0,0],[0,0,0]]);
  var c2 = CUBIC_HERMITE(S0)([p0,p2,[0,0,0],[0,0,0]]);
  var s1 = BEZIER(S1)([c1,c2]);
  return T([0,1,2])(p3)(MAP(s1)(domain));
};
//DRAW(Triangolo([[0,0],[1,0],[0,1],[0.2,0.6,0]]));

var Quadrangolo = function (punti) {
  var p0 = punti[0];
  var p1 = punti[1];
  var p2 = punti[2];
  var p3 = punti[3];
  var p4 = punti[4] || [0,0,0];  
  return T([0,1,2])(p4)(STRUCT([Triangolo([p0,p1,p3]),Triangolo([p1,p2,p3])]));
};
//DRAW(Quadrangolo([[0,0],[1,0],[1,1],[0,1]]));

var Scaffale = function(punti) {
  var p0 = punti[0];
  var p1 = punti[1];
  var p2 = punti[2];
  var p3 = punti[3];
  var p4 = punti[4] || [0,0,0];  
  var ex = punti[5] || [0];  
  var s1 = Quadrangolo([p0,p1,p2,p3]);
  var s2 = EXTRUDE(ex)(POLYLINE([p0,p1]));
  var s3 = EXTRUDE(ex)(POLYLINE([p1,p2]));
  var s4 = EXTRUDE(ex)(POLYLINE([p2,p3]));
  var s5 = EXTRUDE(ex)(POLYLINE([p3,p0]));
  return STRUCT([T([0,1,2])(p4),s2,s3,s4,s5,s1,T([2])(ex),s1]);
}
//DRAW(Scaffale([[0,0],[1,0],[1,1],[0,1],[1,1,1],[2]]));

var Fondo = function () {
  var t1 = Triangolo([[0,0],[0.42,0.42],[0,0.42]]);
  var t2 = Triangolo([[0,0,0],[0.12,0,0],[0.12,0.12,0],[0,0.6,0]]);
  var t3 = Triangolo([[0,0,0],[0.12,0,0],[0,0.12,0],[0.3,0.6,0]]);
  var q1 = Quadrangolo([[0,0],[0.42,0],[0.42,0.18],[0,0.18],[0,0.42,0]]);
  var q2 = Quadrangolo([[0,0],[0.18,0],[0.18,0.12],[0,0.12],[0.12,0.6,0]]);
  return STRUCT([t1,t2,t3,q1,q2]);
}

var Scaffali1 = function () {
  var ipotenusa = SQRT(spes*spes+spes*spes);
  var s1 = Scaffale([[0,0],[0.42,0],[0.42,spes],[0,spes],[0,0.6-spes,0],[prof]]);
  var s2 = Scaffale([[0,0],[0.42,0],[0.42,spes],[0,spes],[0,0.42,0],[prof]]);
  var s3 = Scaffale([[0,0],[0.24,0],[0.24+ipotenusa,spes],[0,spes],[0,0.24,0],[prof]]);
  var s4 = Scaffale([[0,0],[0.12,0],[0.12+ipotenusa,spes],[0,spes],[0,0.12,0],[prof]]);
  return STRUCT([s1,s2,s3,s4]);
}

var Scaffali2 = function () {
  var s5 = Scaffale([[0,0],[spes,0],[spes,0.12],[0,0.12],[0.12,0.6,0],[prof]]);
  var s6 = Scaffale([[0,0],[spes,0],[spes,0.12],[0,0.12],[0.3-spes,0.6,0],[prof]]);
  var s7 = Scaffale([[0,0],[spes,0],[spes,0.18-spes],[0,0.18-spes],[0.24-spes,0.24+spes,0],[prof]]);
  var s8 = Scaffale([[0,0],[spes,0],[spes,0.12],[0,0.12],[0.12-spes,0.12,0],[prof]]);
  return STRUCT([s5,s6,s7,s8]);
}

var Copertura1 = function () {
  var cateto = COS(PI/4)*spes;
  var ipotenusa = SQRT(spes*spes+spes*spes);
  var s1 = Scaffale([[0,0],[0,-ipotenusa],[0.42+spes,0.42-cateto],[0.42,0.42],[0,0,0],[prof]]);
  var s2 = Scaffale([[0,0],[spes,-cateto],[spes,0.18+cateto],[0,0.18],[0.42,0.42,0],[prof]]);
  var s3 = Scaffale([[0,0],[spes,cateto],[-0.12+cateto,0.12+spes],[-0.12,0.12],[0.42,0.6,0],[prof]]);
  var s4 = Scaffale([[0,0],[0.18,0],[0.18+cateto,spes],[-cateto,spes],[0.12,0.72,0],[prof]]);
  var s5 = Scaffale([[0,0],[0.12,0.12],[0.12-cateto,0.12+spes],[0,ipotenusa],[0,0.6,0],[prof]]);
  return STRUCT([s1,s2,s3,s4,s5]);
}

var Copertura2 = function () {
  var t1 = Triangolo([[0,0,0],[0.12,0.12,0],[0,0.12,0],[0,0,prof]]);
  var t2 = Triangolo([[0,0,0],[0.12,0.12,0],[0,0.12,0],[0.12,0.12,prof]]);
  var t3 = Triangolo([[0,0,0],[0.18,0.18,0],[0,0.18,0],[0.24,0.24,prof]]);
  var t4 = Triangolo([[0,0,0],[0.12,0,0],[0,0.12,0],[0.3,0.6,prof]]);
  var t5 = Triangolo([[0,0,0],[0.12,0,0],[0.12,0.12,0],[0,0.6,prof]]);
  return STRUCT([t1,t2,t3,t4,t5]);
}

var p = STRUCT([Fondo(),Scaffali1(),Copertura1()]);
var model = COLOR([1,0,0])(STRUCT([p,S([0])([-1]),p]));
DRAW(model);
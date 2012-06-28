/*
var c = CUBOID([1,2,3]);
var t = TORUS_SURFACE([0.1, 0.9])([12,8]);
var mapping = function(p) {
  var u;
  if (p[0] > 0)
    u = 0;
  else
    u = p[0];
  var v = p[1];
  var w = p[2];
  return [u, v, w];  
}
var mapped = MAP(mapping)(t);
DRAW(mapped);
*/

//k=c+n+1
/*
var controls = [[0,0],[0,1],[1,1],[1,0],[0,0]];
var knots = [0,0,1,2,3,4,4];
var nubspline = NUBSPLINE(1)(knots)(controls);
DRAW(nubspline);
*/

var bezierDetails = function (controlpoints, heigths) {
  var points = [];
  controlpoints.forEach( function (item, index, array) {
    points.push(SIMPLICIAL_COMPLEX([controlpoints[index]])([[0]]));
  });
  var pointsStruct = COLOR([163/255,73/255,164/255])(STRUCT(points));

  //var polygon = COLOR([250/255,177/255,100/255])(POLYLINE(controlpoints));

  var domain = INTERVALS(1)(30);
  var curveMapping = BEZIER(S0)(controlpoints);
  var curve = MAP(curveMapping)(domain);

  return STRUCT([pointsStruct,curve]);
};

var drawCoordinate = function() {
  var polylines = new Array();

  for (var i = 0; i < 31; i++) {
    polylines.push(COLOR([1,0,0])(POLYLINE([[0.5*i,0,0],[0.5*i,15,0]])));
    polylines.push(COLOR([1,0,0])(POLYLINE([[0,0.5*i,0],[15,0.5*i,0]])));
    polylines.push(COLOR([0,1,0])(POLYLINE([[0,0,0.5*i],[0,15,0.5*i]])));
    polylines.push(COLOR([0,1,0])(POLYLINE([[0,0.5*i,0],[0,0.5*i,15]])));
    polylines.push(COLOR([0,0,1])(POLYLINE([[0,0,0.5*i],[15,0,0.5*i]])));
    polylines.push(COLOR([0,0,1])(POLYLINE([[0.5*i,0,0],[0.5*i,0,15]])));
  }

  DRAW(STRUCT(polylines));
}

var myBezier = function(controlpoints, heigth) { 
  var points = [];

  controlpoints.forEach( function (item, index, array) {
    points.push([controlpoints[index][0],controlpoints[index][1],heigth]);
  });

  return BEZIER(S0)(points);
}

var bezierCurves = function(controls, heigths) {
  var domain = INTERVALS(1)(30);
  var curves = new Array();
  var h = heigths || 0;

  if (h != 0) {
    for (var i = 0; i < controls.length; i++) {
      var curvefun = myBezier(controls[i],heigths[i]);
      var curve = MAP(curvefun)(domain);
      curves.push(curve);
    }
  }
  else {
    for (var i = 0; i < controls.length; i++) {
      var curvefun = BEZIER(S0)(controls[i]);
      var curve = MAP(curvefun)(domain);
      curves.push(curve);
    }
  }

  return STRUCT(curves);
}

var coloreOssa = [255/255,250/255,175/255];
var coloreDisco = [200/255,190/255,230/255];

var bezierSurface = function(controls, heigths) {
  var domain = DOMAIN([[0,1],[0,1]])([30,30]);
  var curvefuns = new Array();
  var h = heigths || 0;
  if (h != 0) {
    for (var i = 0; i < controls.length; i++) {
      var curvefun = myBezier(controls[i],heigths[i]);
      curvefuns.push(curvefun);
    }
  }
  else {
    for (var i = 0; i < controls.length; i++) {
      var curvefun = BEZIER(S0)(controls[i]);
      curvefuns.push(curvefun);
    }
  }

  var surface = BEZIER(S1)(curvefuns);
  return MAP(surface)(domain);
}

var CorpoVertebrale = function() {
  var controls1 = [
    [[0,4.5]],
    [[0,4],[1,4.5],[0,5]],
    [[0,1],[2,1],[3,1.5],[5,2],[6,3],[6.5,4],[6,8],[4,9],[3,8.5],[2,8],[1,7],[0,7]],    
    [[0,1],[2,1],[3,1.5],[5,2],[6,3],[6.5,4],[6,8],[4,9],[3,8.5],[2,8],[1,7],[0,7]]
  ];
  var h1 = [1.25,1.25,1,0];
  var surf1 = bezierSurface(controls1,h1);

  var controls2 = [
    [[0,1],[2,1],[3,1.5],[5,2],[6,3],[6.5,4],[6,8],[4,9],[3,8.5],[2,8],[1,7],[0,7]],
    [[0,0],[2,0],[3,0.5],[5,1],[6,1.5],[7,2.5],[7.5,4],[7,8],[6,9],[4,10],[3,9.5],[2,9],[1,8],[0,8]]
  ];
  var h2 = [0,0];
  var surf2 = bezierSurface(controls2,h2);

  var controls3 = [
    [[0,0],[2,0],[3,0.5],[5,1],[6,1.5],[7,2.5],[7.5,4],[7,8],[6,9],[4,10],[3,9.5],[2,9],[1,8],[0,8]],
    [[0,1],[2,1],[3,1.5],[5,2],[6,3],[6.5,4],[6,8],[4,9],[3,8.5],[2,8],[1,7],[0,7]],
    [[0,0],[2,0],[3,0.5],[5,1],[6,1.5],[7,2.5],[7.5,4],[7,8],[6,9],[4,10],[3,9.5],[2,9],[1,8],[0,8]]
  ];
  var h3 = [0,2.5,5];
  var surf3 = bezierSurface(controls3,h3);

  var surf4 = T([2])([5])(surf2);

  var surf5 = T([2])([5])(S([2])([-1])(surf1));

  var surf = STRUCT([surf1,surf2,surf3,surf4,surf5]);
  var specsurf = S([0])([-1])(surf);
  
  return COLOR(coloreOssa)(STRUCT([surf,specsurf]));
}

var ProcessoSpinoso = function() {
  var controls1 = [
    [[0,1]],
    [[0,0],[0.4,0],[1,1],[-1,2],[1,3],[0.4,4],[0,4],[-0.4,4],[-1,3],[1,2],[-1,1],[-0.4,0],[0,0]],
    [[0,0],[0.4,0],[1,1],[-1,2],[1,3],[0.4,4],[0,4],[-0.4,4],[-1,3],[1,2],[-1,1],[-0.4,0],[0,0]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[0,1],[0.4,1],[1,1.5],[-1,2.5],[1,3.5],[0.4,4.5],[0,4.5],[-0.4,4.5],[-1,3.5],[1,2.5],[-1,1.5],[-0.4,1],[0,1]],
    [[4,4],[4.4,4],[5,5],[3,5],[5,6.5],[3.4,6.5],[4,6.5],[3.6,6.5],[3,6.5],[5,5],[3,5],[3.6,4],[4,4]],
    [[4,4],[6,1.5],[5.5,5],[3.5,5],[5.5,6.5],[3.9,6.5],[4,6.5],[3.9,6.5],[2,6.5],[4.5,5],[3,5],[3.6,4],[4,4]],
    [[4,4],[6,1.5],[5.5,5],[3.5,5],[5.5,6.5],[3.9,6.5],[4,6.5],[3.9,6.5],[2,6.5],[4.5,5],[3,5],[3.6,4],[4,4]],
    [[4,3],[4.4,3],[6,4],[4,4],[6,6.5],[4.4,6.5],[4,6.5],[3.4,6.5],[2,6.5],[4,4],[4,4],[3.4,3],[4,3]],
  ];
  var h1 = [-0.1,-0.1,0.5,1.75,2,2.25,2.5,2.75,3,3.25,3.5,3.75,5,6,7,8];
  var surf1 = bezierSurface(controls1,h1);
  /*
  var controls2 = [
  ];
  var h2 = [];
  var surf2 = bezierSurface(controls2,h2);
  */
  var surf = STRUCT([surf1]);
  var specsurf = S([0])([-1])(surf);

  return COLOR(coloreOssa)(STRUCT([surf,specsurf]));
}

var Disco = function() {
  var controls1 = [
    [[0,0],[2,0],[3,0.5],[5,1],[6,1.5],[7,2.5],[7.5,4],[7,8],[6,9],[4,10],[3,9.5],[2,9],[1,8],[0,8]],
    [[0,0],[2,0],[4,0.5],[6,1],[7,1.5],[8,2.5],[8.5,4],[8,8],[7,9],[5,10],[4,9.5],[3,9],[2,8],[0,8]],
    [[0,0],[2,0],[3,0.5],[5,1],[6,1.5],[7,2.5],[7.5,4],[7,8],[6,9],[4,10],[3,9.5],[2,9],[1,8],[0,8]]
  ];
  var h1 = [0,0.75,1.5];
  var surf1 = bezierSurface(controls1,h1);

  var surf = STRUCT([surf1]);
  var specsurf = S([0])([-1])(surf);

  return COLOR(coloreDisco)(STRUCT([surf,specsurf]));
}

var FaccettaSuperiore = function() {
  var controls1 = [
    [[4,12,6.5],[4,12.4,6.5],[3.5,14,5.75],[3,12,4],[3.5,10,5.75],[4,11.6,6.5],[4,12,6.5]],
    [[4.25,12,6.25],[4.25,12.4,6.25],[3.75,14,5.5],[3.25,12,3.75],[3.75,10,5.5],[4.25,11.6,6.25],[4.25,12,6.25]],
    [[4.5,10,6],[6,10.5,5],[4.5,11,2.5],[3.5,10.5,5],[4.5,10,6]],
    [[4.5,9,5],[6,9,4],[4.5,9,0.5],[3.5,9,4],[4.5,9,5]],
    [[4.5,8,4],[6,8,3],[4.5,8,-0.5],[3.5,8,3],[4.5,8,4]]
  ];
  var surf1 = COLOR(coloreOssa)(bezierSurface(controls1));

  var controls2 = [
    [[4,12,6.5],[4,12.4,6.5],[3.5,14,5.75],[3,12,4],[3.5,10,5.75],[4,11.6,6.5],[4,12,6.5]],
    [[3.9,12,6.6],[3.9,12.4,6.6],[3.4,14,5.76],[2.9,12,4.1],[3.4,10,5.85],[3.9,11.6,6.6],[3.9,12,6.6]]
  ];
  var surf2 = COLOR(coloreDisco)(bezierSurface(controls2));

  var controls3 = [
    [[3.75,12,6]],
    [[3.9,12,6.6],[3.9,12.4,6.6],[3.4,14,5.76],[2.9,12,4.1],[3.4,10,5.85],[3.9,11.6,6.6],[3.9,12,6.6]]
  ];
  var surf3 = COLOR(coloreDisco)(bezierSurface(controls3));

  var surf = STRUCT([surf1,surf2,surf3]);
  var specsurf = S([0])([-1])(surf);

  return STRUCT([surf,specsurf]);
}

var FaccettaInferiore = function() {
  var controls1 = [
    [[3.9,12,0.1],[3.9,12.4,0.1],[3.4,14,-0.65],[2.9,12,-2.4],[3.4,10,-0.65],[3.9,11.6,0.1],[3.9,12,0.1]]
  ];
  var surf1 = bezierSurface(controls1);
  var surf2 = bezierCurves(controls1);

  var surf = STRUCT([surf1,surf2]);
  var specsurf = S([0])([-1])(surf);

  return COLOR([1,0,0])(STRUCT([surf,specsurf]));
}

drawCoordinate();

var corpo = new CorpoVertebrale();
var proc = T([1,2])([15.5,-1.5])(R([1,2])([PI/2])(new ProcessoSpinoso()));
var facsup = new FaccettaSuperiore();
var facinf = new FaccettaInferiore();

var vertebra1 = STRUCT([corpo,proc,facsup,facinf]);
var disco1 =  T([2])([5])(new Disco());
var vertebra2 = T([2])([6.5])(vertebra1);
var disco2 = T([2])([6.5])(disco1);
var vertebra3 = T([2])([13])(vertebra1);
var model = STRUCT([vertebra1,disco1,vertebra2,disco2,vertebra3]);
DRAW(model);


/*
var model = STRUCT([new LaminaVertebrale()]);
DRAW(model);
*/

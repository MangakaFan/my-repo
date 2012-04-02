//disegna un complesso simpliciale
var quad = SIMPLICIALCOMPLEX([[0,0],[1,0],[1,1],[0,1]])([[0,1,3],[1,2,3]]);
DRAW(quad);

//ripeto il simplesso simpliciale 10 volte
var quad10 = SIMPLEXGRID([REPEAT(3)(REPLICA(10)([1,-1]))]);
DRAW(quad10);
var Point = function (x, y) {
  this.x = x;
  this.y = y;
  this.distance = function(point) {
	  return Math.sqrt(Math.pow(point.y - this.y, 2) + Math.pow(point.x - this.y, 2));
  };
}

Point.prototype.translate = function(dx, dy) {
  this.x += dx;
  this.y += dy;
}

function randomPoint() {
	var x = Math.floor(Math.random() * 201 - 100);
	var y = Math.floor(Math.random() * 201 - 100);
	return new Point(x, y);
}

function generateRandomPoints(n) {
	var array = [];
	for (var i = 0; i < n; i++) {
		var p = randomPoint();
		array.push(p);
	}
	return array;
}
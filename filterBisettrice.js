function filterBisettrice(array) {
	return array.filter(function(item) {
		return item.y - item.x > 0;
	});
}
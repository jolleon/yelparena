function Map (game_width, game_height) {
	this.array = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	]

	this.map_height = this.array.length;
	this.map_width = this.array[0].length;

	this.game_width = game_width;
	this.game_height = game_height;
}

Map.prototype.game_block_dimensions = function() {

	var game_block_width = this.game_width / this.map_width;
	var game_block_height = this.game_height / this.map_height;

	// width is x, height is y
	return {width: game_block_width, height: game_block_height};
}

Map.prototype.map_block_coordinates = function() {
	var map_block_coordinates = [];
	var game_block_dimensions = this.game_block_dimensions();
	for (var y = 0; y < this.map_height; y++) {
		for (var x = 0; x < this.map_height; x++) {
			if (this.canMoveMap(x, y)) {
				var point = [x * game_block_dimensions.width, y * game_block_dimensions.height];
				map_block_coordinates.push(point);
			}
		}
	}
	return map_block_coordinates;
}

Map.prototype.convert_game_to_map_coordinates = function(game_x, game_y)  {
	// game_x, game_y are floats
	// just going to assume that the game_coordinates are always bigger than the map_coordinates
	var game_block_dimensions = this.get_game_block_dimensions();
	var map_x = Math.floor(game_x / game_block_dimensions[0]);
	var map_y = Math.floor(game_y / game_block_dimensions[1]);

	return [map_x, map_y];
}

Map.prototype.canMove = function(game_x, game_y) {

	var point = this.convert_game_to_map_coordinates(game_x, game_y);
	var map_x = point[0];
	var map_y = point[1];

	return this.canMoveMap(map_x, map_y);
}

Map.prototype.canMoveMap = function(x, y) {

	// check x coordinate for bounds
	if ((x < 0) || (x >= this.array.length)) {
		return false
	}

	// check y coordinates for bounds
	if ((y < 0) || (y >= this.array[0].length)) {
		return false
	}

	if (this.array[x][y] === 1) {
		return false
	}

	return true
}



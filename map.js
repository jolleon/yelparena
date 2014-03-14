function Map (game_height, game_width) {
	this.unscaled_array = [
        [0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1],
        [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0]
	]

	var scale_factor = 3;

	this.array = [];
	for (var row_index = 0; row_index < this.unscaled_array.length; row_index++) {
		var new_row = [];
		var current_row = this.unscaled_array[row_index];
		for (var i = 0; i < current_row.length; i++) {
			for (var scale = 0; scale < scale_factor; scale++) {
				new_row.push(current_row[i]);
			}
		}
		for (var scale = 0; scale < scale_factor; scale++) {
			this.array.push(new_row);
		}
	}

	this.map_height = this.array.length;
	this.map_width = this.array[0].length;

	this.game_width = game_width;
	this.game_height = game_height;

	this.wall_coordinates = [];
}

Map.prototype.game_block_dimensions = function() {

	var game_block_width = this.game_width / this.map_width;
	var game_block_height = this.game_height / this.map_height;

	// width is x, height is y
	return {width: game_block_width, height: game_block_height};
}

Map.prototype.map_block_coordinates = function() {
	if (this.wall_coordinates.length === 0) {
		var map_block_coordinates = [];
		var game_block_dimensions = this.game_block_dimensions();
		for (var x = 0; x < this.map_width; x++) {
			for (var y = 0; y < this.map_height; y++) {
				if (this.canMoveMap(x, y) === false) {
					var point = {'x': x * game_block_dimensions.width, 'y': y * game_block_dimensions.height};
					this.wall_coordinates.push(point);
				}
			}
		}
	}
	return this.wall_coordinates
}

Map.prototype.convert_game_to_map_coordinates = function(game_x, game_y)  {
	// game_x, game_y are floats
	// just going to assume that the game_coordinates are always bigger than the map_coordinates
	var game_block_dimensions = this.game_block_dimensions();
	var map_x = Math.floor(game_x / game_block_dimensions.width);
	var map_y = Math.floor(game_y / game_block_dimensions.height);

	return {x:map_x, y:map_y};
}

Map.prototype.canMove = function(game_x, game_y) {

	var point = this.convert_game_to_map_coordinates(game_x, game_y);
	return this.canMoveMap(point.x, point.y);
}

Map.prototype.canMoveMap = function(x, y) {

	// check x coordinate for bounds
	if ((x < 0) || (x >= this.map_width)) {
		return false
	}

	// check y coordinates for bounds
	if ((y < 0) || (y >= this.map_height)) {
		return false
	}

	if (this.array[y][x] === 1) {
		return false
	}

	return true
}



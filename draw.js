var drawGame = function() {
    clearCanvas();
    drawMap();
    for(var i=0; i<players.length; i++){
        var p = players[i];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
    }

}

var drawMap = function() {
    ctx.fillStyle = '#FFF';
	var game_block_dimensions = map.game_block_dimensions();
	var map_block_coordinates = map.map_block_coordinates();

	for (var i = 0; i < map_block_coordinates.length; i++) {
		var point = map_block_coordinates[i];
		ctx.fillRect(point[0], point[1], game_block_dimensions.width, game_block_dimensions.height);
	}
}
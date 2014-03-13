var drawPlayer = function(p) {
    var pSize = 10;
    var pRadius = pSize / 2;
    var gunLength = pRadius + 5;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - pRadius, p.y - pRadius, pSize, pSize);

    // draw gun
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x + gunLength * Math.cos(p.direction), p.y - gunLength * Math.sin(p.direction));
    ctx.stroke();

}



var drawGame = function() {
    clearCanvas();
    drawMap();
    for(var i=0; i<players.length; i++){
        var p = players[i];
        drawPlayer(p);
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

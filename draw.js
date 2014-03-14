var drawPlayer = function(p) {
    var pSize = 10;
    var pRadius = pSize / 2;
    var gunLength = pRadius + 5;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x - pRadius, p.y - pRadius, pSize, pSize);
    ctx.fillText(p.name, p.x-15, p.y+15)

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
	for(var i=0; i<bullets.length; i++){
		var b = bullets[i];
		ctx.fillStyle = b.color;
		ctx.fillRect(b.x - 5, b.y - 5, b.size, b.size);
	}
}

var drawMap = function() {
    ctx.fillStyle = '#999';
	var game_block_dimensions = map.game_block_dimensions();
	var map_block_coordinates = map.map_block_coordinates();

	for (var i = 0; i < map_block_coordinates.length; i++) {
		var point = map_block_coordinates[i];
		ctx.fillRect(point.x, point.y, game_block_dimensions.width, game_block_dimensions.height);
	}
}

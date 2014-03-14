var drawPlayer = function(p) {
    var pSize = 10;
    var pRadius = pSize / 2;
    var gunLength = pRadius + 5;

    // glow
    var rad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pRadius + 4);
    rad.addColorStop(0, 'rgba(50, 50, 50, 0.5)');
    rad.addColorStop(0.4, p.color);
    rad.addColorStop(0.5, p.color);
    rad.addColorStop(0.8, 'rgba(255, 255, 255, 0.2)');
    rad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(p.x - pSize, p.y - pSize, 2 * pSize, 2 * pSize);

    // name
    ctx.fillText(p.name, p.x-15, p.y+15)

    // draw gun
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.lineTo(p.x + pRadius * Math.cos(p.direction), p.y - pRadius * Math.sin(p.direction));
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
    ctx.fillStyle = '#999';
	var game_block_dimensions = map.game_block_dimensions();
	var map_block_coordinates = map.map_block_coordinates();
	for (var i = 0; i < map_block_coordinates.length; i++) {
		var point = map_block_coordinates[i];
		ctx.fillRect(point.x, point.y, game_block_dimensions.width, game_block_dimensions.height);
	}
}

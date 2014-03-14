var drawPlayer = function(p) {
    var pSize = 10;
    var pRadius = pSize / 2;
    var gunLength = pRadius + 5;

    // glow
    var rad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pRadius + 4);
    rad.addColorStop(0, 'rgba(50, 50, 50, 0.5)');
    rad.addColorStop(0.4, p.color);
    rad.addColorStop(0.5, p.color);
    rad.addColorStop(0.8, hexToRgba(p.color, 0.2));
    rad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(p.x - pSize, p.y - pSize, 2 * pSize, 2 * pSize);

    // name
    ctx.fillStyle = p.color;
    ctx.font = "10px Lucida Console";
    ctx.fillText(p.name, p.x - p.name.length * 3, p.y - gunLength - 2)

    // draw gun
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.lineTo(p.x + pRadius * Math.cos(p.direction), p.y - pRadius * Math.sin(p.direction));
    ctx.lineTo(p.x + gunLength * Math.cos(p.direction), p.y - gunLength * Math.sin(p.direction));
    ctx.stroke();

	// draw health
	var healthWidth = Math.max(0, p.health * 1.5);
	ctx.strokeStyle = '#0c0';
	ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.lineTo(p.x - healthWidth, p.y - 9);
    ctx.lineTo(p.x + healthWidth, p.y - 9);
    ctx.stroke();

}



var drawGame = function() {
    clearCanvas();
    drawMap();
    drawBonuses();
    for(var i=0; i<players.length; i++){
        var p = players[i];
        drawPlayer(p);
    }
	for(var i=0; i<bullets.length; i++){
		var b = bullets[i];
		ctx.fillStyle = b.color;
		ctx.fillRect(b.x - b.size / 2, b.y - b.size / 2, b.size, b.size);
	}
}

var drawMap = function() {
    ctx.fillStyle = '#999';
	var game_block_dimensions = map.game_block_dimensions();
	var map_block_coordinates = map.map_block_coordinates();

    // to draw big squares in background
    var big_square_width = 50;
    for (var x = 0; x < canvas.width / big_square_width; x++){
        for (var y = 0; y < canvas.height / big_square_width; y++){
            if ((x+y) % 2){
                ctx.fillStyle = '#111';
            } else {
                ctx.fillStyle = '#222';
            }
            ctx.fillRect(
                big_square_width * x,
                big_square_width * y,
                big_square_width * (x+1),
                big_square_width * (y+1)
            );
        }
    }

	for (var i = 0; i < map_block_coordinates.length; i++) {
		var point = map_block_coordinates[i];

        var grad = ctx.createLinearGradient(
            Math.round(point.x),
            Math.round(point.y),
            Math.round(point.x) + Math.round(game_block_dimensions.width),
            Math.round(point.y) + Math.round(game_block_dimensions.height));
        grad.addColorStop(0, '#ddd');
        grad.addColorStop(1, '#333');
        ctx.fillStyle = grad;
        ctx.fillRect(
            Math.round(point.x),
            Math.round(point.y),
            Math.round(game_block_dimensions.width),
            Math.round(game_block_dimensions.height));
	}
}

var drawGame = function() {
    clearCanvas();
    for(var i=0; i<players.length; i++){
        var p = players[i];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
    }
	for(var i=0; i<bullets.length; i++){
		var b = bullets[i];
		ctx.fillStyle = b.color;
		ctx.fillRec(b.x - 5, b.y - 5, b.size, b.size);
	}
}

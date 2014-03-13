var drawGame = function() {
    clearCanvas();
    for(var i=0; i<players.length; i++){
        var p = players[i];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
    }

}

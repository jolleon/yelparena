
var updateGame = function() {

	// move every buillet on screen
	for (var i=0; i<bullets.length; i++){
		var bullet = bullets[i];
		bullet.update();
	}
    player.update();
}

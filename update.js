
var updateGame = function() {
    
	if(Keys.isDown(Keys.SHOOT)) {
		var bullet = new Bullet(bullets.length, player);
	}

	// move every buillet on screen
	for (var i=0; i<bullets.length; i++){
		var bullet = bullets[i];
		bullet.update();
	}
    player.update();
}

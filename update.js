
var updateGame = function() {
    // controls
    if (Keys.isDown(Keys.DOWN)) {
        player.y += 1;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.UP)) {
        player.y -= 1;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.RIGHT)) {
        player.x += 1;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.LEFT)) {
        player.x -= 1;
        localPlayerDataRef.set(player);
    }
	if(Keys.isDown(Keys.SPACE)) {
		var bullet = new Bullet(bullets.length, player.x, player.y, player.name);
	}

	// move every buillet on screen
	for (var i=0; i<bullets.length; i++){
		var bullet = bullets[i];
		//bullet.move();
	}
}

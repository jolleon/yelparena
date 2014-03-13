
var updateGame = function() {
    if (Keys.isDown(Keys.DOWN)) {
        player.y += 1;
        localPlayerDataRef.set(player);
    }

	if(Keys.isDown(Keys.SPACE)) {
		var bullet = new Bullet(bullets.length, player.x, player.y, player.name);
	}

	for (var i=0; i<bullets.length; i++){
		var bullet = bullets[i];
		bullet.move();
	}
}

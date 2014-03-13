
var updateGame = function() {
    if (Keys.isDown(Keys.DOWN)) {
        player.y += 1;
        localPlayerDataRef.set(player);
    }

	if(Keys.isDown(Keys.SPACE)) {
		bullet = new Bullet(player.x, player.y);
		bullets.push(bullet);
	}

	for (var i=0; i<bullets.length; i++){
		bullets[i].move();
	}
}

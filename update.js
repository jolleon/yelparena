
var updateGame = function() {
    
	if(Keys.isDown(Keys.SHOOT)) {
        var newBulletDataRef = bulletsDataRef.push();
		var bullet = new Bullet(player);
        newBulletDataRef.set(bullet);
        myBullets.push({ref: newBulletDataRef, bullet:bullet});
		playSound(Keys.SHOOT);
	}

	// move locally created bullets
    update_bullets();
    player.update();
}

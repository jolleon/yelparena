
var updateGame = function() {

	// move every buillet on screen
	for (var i=0; i<bullets.length; i++){
		var bullet = bullets[i];
		if(bullet.player_name == player.name){
			bullet.update();
		}
	}
    player.update();
}

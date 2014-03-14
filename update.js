var photoSpan = $('#photoSpan').get(0);
var messageSpan = $('#messageSpan').get(0);

var updateGame = function() {
    
	if(Keys.isDown(Keys.SHOOT)) {
		var bullet = new Bullet(bullets.length, player);
		playSound(Keys.SHOOT);
	}
	
	/*if(Keys.isDown(Keys.BLARGH)) {
		playerPhoto('yoann', updateMessageSpanPhoto);
		playerTalk('yoann', updateMessageSpanText);
	}*/

	// move every buillet on screen
	for (var i=0; i<bullets.length; i++){
		var bullet = bullets[i];
		bullet.update();
	}
    player.update();
}


function updateMessageSpanPhoto(user_id, photoUrl) {
	$(photoSpan).html("<img src=\"" + photoUrl + "\" height=\"100\" width=\"100\" />");	
}

function updateMessageSpanText(user_id, text) {
	$(messageSpan).html(user_id + " says: " + text)
}

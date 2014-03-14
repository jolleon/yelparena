var photoSpan = $('#photoSpan').get(0);
var messageSpan = $('#messageSpan').get(0);

var updateGame = function() {

	
	if(Keys.isDown(Keys.SIM_IRC)) {
		playerPhoto('tianyu', updateMessageSpanPhoto);
		playerTalk('tianyu', updateMessageSpanText);
	}
	
	// move locally created bullets
    update_bullets();
    player.update();
}


function updateMessageSpanPhoto(user_id, photoUrl) {
	$(photoSpan).html("<img src=\"" + photoUrl + "\" height=\"100\" width=\"100\" />");	
}

function updateMessageSpanText(user_id, text) {
	$(messageSpan).html(user_id + " says: " + text)
}

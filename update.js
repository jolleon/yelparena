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
	updateScoreFeed();
}


function updateMessageSpanPhoto(user_id, photoUrl) {
	$(photoSpan).html("<img src=\"" + photoUrl + "\" height=\"100\" width=\"100\" />");	
}

function updateMessageSpanText(user_id, text) {
	$(messageSpan).html(user_id + " says: " + text);
}

function updateScoreFeed() {
	$('#scores').empty();
	for (var i=0; i<players.length; i++){
		var player = players[i];
	 	$('#scores').append('<span style="color:' + player.color + '">' + player.name + ': ' + player.score + ' </span><br>');
	}
}

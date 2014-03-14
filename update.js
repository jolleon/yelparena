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

	players.sort(function(a,b){
		return b.score - a.score;
	})

	$('#scores').empty();
	var player_displayed = false;
	var display_len = Math.min(10, players.length);
	for (var i=0; i<display_len; i++){
		var cur_player = players[i];
		if(player && cur_player.name == player.name){
			player_displayed = true;
		}
	 	$('#scores').append('<span style="color:' + cur_player.color + '">' + cur_player.name + ': ' + cur_player.score + ' </span><br>');
	}
	if(player && !player_displayed){
	 	$('#scores').append('<span style="color:' + player.color + '">' + player.name + ': ' + player.score + ' </span><br>');
	}
}

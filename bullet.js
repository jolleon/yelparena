function Bullet(player, direction_radians, rotation_offset, rotation_distance){
	this.x = player.x + (rotation_distance * Math.cos(rotation_offset + player.direction));
	this.y = player.y + (rotation_distance * Math.sin(rotation_offset + player.direction));
    this.player = player.id;

	this.color = player.color; //pick cool bullet color
	this.speed = 3;
	this.direction = player.direction + direction_radians;
	this.size = player.bulletSize;
}

Bullet.prototype.location = function() {
	return {x: this.x, y: this.y};
}

update_my_bullets = function() {
	for (var i = 0; i < myBullets.length; i++) {
		var b = myBullets[i];
        var bullet = b.bullet;
        var ref = b.ref;
		var playerHit = false;
		for (var player_index = 0; player_index < players.length; player_index++) {
			var current_player = players[player_index];

			// don't shoot yourself
			if (current_player.id == player.id) {
				continue;
			}
			var current_player_location = {x: current_player.x, y: current_player.y};
			var distance = get_distance(bullet.location(), current_player_location);

			if (distance < 6) {
				playerHit = current_player;
                break;
			}
		}
		if (playerHit) {
            player.score += 1;
            localPlayerDataRef.set(player);

            hitsDataRef.push({from: player.id, to: playerHit.id, size: myBullets[i].bullet.size});
            ref.remove();
			myBullets.splice(i, 1);
			i--;
			delete b;
            playerPhoto(playerHit.name, updateMessageSpanPhoto);
            playerTalk(playerHit.name, updateMessageSpanText);
			continue;
		}


        bullet.x += bullet.speed * Math.cos(bullet.direction);
        bullet.y -= bullet.speed * Math.sin(bullet.direction);

        if (map.canMove(bullet.x, bullet.y)){
            if ((loop_counter % 10) == 0){
                //update firebase only every 20 loops
                ref.set(bullet);
            }
        } else {
            ref.remove();
            delete b;
			myBullets.splice(i, 1);
			i--;
        }
	}
}


update_bullets = function() {
	for (var i = 0; i < bullets.length; i++) {
		var bullet = bullets[i];
        bullet.x += bullet.speed * Math.cos(bullet.direction);
        bullet.y -= bullet.speed * Math.sin(bullet.direction);
    }
    update_my_bullets();
}


var setupBulletsFirebase = function() {

	bulletsDataRef = new Firebase(firebaseUrl + 'bullets/');

	bulletsDataRef.on('child_added', function(snapshot){
        var new_bullet = snapshot.val();
        new_bullet.id = snapshot.name();
		bullets.push(new_bullet);
	});
	bulletsDataRef.on('child_changed', function(snapshot){
        // don't update own bullets here
        if (snapshot.val().player != player.id){
            for (var i=0; i<bullets.length; i++){
                if (bullets[i].id == snapshot.name()){
                    bullets[i] = snapshot.val();
                    bullets[i].id = snapshot.name();
                }
            }
        }
	});
	bulletsDataRef.on('child_removed', function(snapshot){
       for (var i=0; i<bullets.length; i++){
            if (bullets[i].id == snapshot.name()){
                bullets.splice(i, 1);
            }
        }
    });
}



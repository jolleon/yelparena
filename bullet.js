function Bullet(player){
	this.x = player.x;
	this.y = player.y;
	this.color = player.color; //pick cool bullet color
	this.speed = 3;
	this.direction = player.direction;
	this.size = 2;
}

Bullet.prototype.location = function() {
	return {x: this.x, y: this.y};
}

update_bullets = function() {
//	$.each(myBullets, function(index, b) {
	for (var i = 0; i < myBullets.length; i++) {
		var b = myBullets[i];
        var bullet = b.bullet;
        var ref = b.ref;
		var bullet_is_used = false;
		for (var player_index = 0; player_index < players.length; player_index++) {
			if (bullet_is_used === true) {
				continue;
			}
			var current_player = players[player_index];

			// don't shoot yourself
			if (current_player.id == player.id) {
				continue;
			}
			var current_player_location = {x: current_player.x, y: current_player.y};
			var distance = get_distance(bullet.location(), current_player_location);

			if (distance < 6) {
				bullet_is_used = true;
			}
		}
		if (bullet_is_used === true) {
            ref.remove();
			myBullets.splice(i, 1);
			i--;
			delete b;
			return true;
		}


        bullet.x += bullet.speed * Math.cos(bullet.direction);
        bullet.y -= bullet.speed * Math.sin(bullet.direction);

        if (map.canMove(bullet.x, bullet.y)){
            ref.set(bullet);
        } else {
            ref.remove();
            delete b;
			myBullets.splice(i, 1);
			i--;
            return true;
        }
	}
}

var setupBulletsFirebase = function() {

	bulletsDataRef = new Firebase(firebaseUrl + 'bullets/');

	bulletsDataRef.on('child_added', function(snapshot){
        var new_bullet = snapshot.val();
        new_bullet.id = snapshot.name();
		bullets.push(new_bullet);
	});
	bulletsDataRef.on('child_changed', function(snapshot){
        for (var i=0; i<bullets.length; i++){
            if (bullets[i].id == snapshot.name()){
                bullets[i] = snapshot.val();
                bullets[i].id = snapshot.name();
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



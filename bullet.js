function Bullet(player){
	this.x = player.x;
	this.y = player.y;
	this.color = player.color; //pick cool bullet color
	this.speed = 1; // no idea what's appropriate here
	this.direction = player.direction;
	this.size = 2;
}

update_bullets = function() {
	for (var i=0; i < myBullets.length; i++){
		var b = myBullets[i];
        var bullet = b.bullet;
        var ref = b.ref;

        bullet.x += bullet.speed * Math.cos(bullet.direction);
        bullet.y += bullet.speed * Math.sin(bullet.direction);

        if (map.canMove(bullet.x, bullet.y)){
            ref.set(bullet);
        } else {
            myBullets.splice(i, 1);
            i--;
            ref.remove()
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



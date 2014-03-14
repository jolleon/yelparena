function Bullet(id, player){
	this.id = id;
	this.x = player.x;
	this.y = player.y;
	this.color = player.color; //pick cool bullet color
	this.speed = 1; // no idea what's appropriate here
	this.direction = player.direction;
	this.size = 2;
	this.player_name = player.name;

	//write into Firebase
	bulletsDataRef.child(id).set(this);
}

Bullet.prototype.update = function() {
	this.x += this.speed * Math.cos(this.direction);
	this.y += this.speed * Math.sin(this.direction);

	if (map.canMove(this.x, this.y) != true){
		bulletsDataRef.child(this.id).remove()
	}
}

var setupBulletsFirebase = function() {
	bulletsDataRef = new Firebase(firebaseUrl + 'bullets/');
	
	bulletsDataRef.on('child_added', function(snapshot){
		bullets.push(snapshot.val());
	});
	bulletsDataRef.on('value', function(snapshot){
	});
	bulletsDataRef.on('child_removed', function(snapshot){
       for (var i=0; i<bullets.length; i++){
            if (bullets[i].id == snapshot.name()){
                bullets.splice(i, 1);
            }
        }
    });
}



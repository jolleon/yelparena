function Bullet(id, x, y, player){
	this.id = id;
	this.x = x;
	this.y = y;
	this.color = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff']; //pick cool bullet color
	this.speed = 0.1; // no idea what's appropriate here
	this.direction = 0;
	this.size = 10;
	this.player = player;

	//write into Firebase
	bulletsDataRef.child(id).set(this);
}

Bullet.prototype.update = function() {
	this.x += this.speed * Math.cos(this.direction);
	this.y += this.speed * Math.sin(this.direction);

	if (map.canMove(this.x, this.y) != true){
		bulletsDataRef.child(id).remove()
	}
}

var setupBulletsFirebase = function() {
	bulletsDataRef = new Firebase(firebaseUrl + 'bullets/');
	
	bulletsDataRef.on('child_added', function(snapshot){
		bullets.push(snapshot.val());
	});
	
	bulletsDataRef.on('value', function(snapshot){
	});
}



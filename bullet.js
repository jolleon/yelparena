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

Bullet.prototype.move = function() {
	this.x += this.speed * Math.cos(this.direction);
	this.y += this.speed * Math.sin(this.direction);
}

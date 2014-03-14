var maxBullets = 10;

var Keys = {
    UP: 87, // w
    DOWN: 83, // s
    LEFT: 65, // a
    RIGHT: 68, // d
    SHOOT: 32, // space
    SIM_IRC: 66, //b

    _pressed: {},

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    isMoving: function() {
        return this._pressed[this.UP] ||
            this._pressed[this.DOWN] ||
            this._pressed[this.LEFT] ||
            this._pressed[this.RIGHT];
    },

    onKeydown: function(event) {
		// can only shoot once for each keyDown event
		if ((event.keyCode == this.SHOOT) && (this._pressed[this.SHOOT] !== true)) {
			player.shoot();
		}

        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};
var Weapons = {
	PISTOL: 1,
	DUAL: 2,
	SPREAD: 3,
}

Player = function(name, id){
	var point = map.newPlayerCoordinates();

    this.name = name;
    this.score = 0;
    this.speed = 1.5;
    this.x = point.x;
    this.y = point.y;
    this.direction = 0;
    this.color = randomBrightColor();
	this.id = id;
    this.health = 10;
	this.weapon = Weapons.PISTOL;
	this.bulletSize = 3;
}

Player.prototype.move = function(direction) {
    var x = this.x + this.speed * Math.cos(direction);
    var y = this.y - this.speed * Math.sin(direction);
    this.direction = direction;

    var playerSize = 8; // margin so that you can't be too close to a wall
    var max_x = x + playerSize;
    var max_y = y + playerSize;
    var min_x = x - playerSize;
    var min_y = y - playerSize;
    if (map.canMove(x, y) &&
         map.canMove(min_x, min_y) &&
         map.canMove(max_x, min_y) &&
         map.canMove(max_x, max_y) &&
         map.canMove(min_x, max_y)) {
        this.x = x;
        this.y = y;
    }

	// only update sometimes
	if (loop_counter % 10 == 0) {
		localPlayerDataRef.set(player);
	};
}

Player.prototype.can_shoot = function() {
	if (myBullets.length >= maxBullets) {
		return false;
	} else {
		return true;
	}
}

Player.prototype.shoot = function() {
	if (!this.can_shoot()) {
		return;
	}

	if (this.weapon === Weapons.PISTOL) {
		var newBulletDataRef = bulletsDataRef.push();
        newBulletDataRef.onDisconnect().remove();
		var bullet = new Bullet(player, 0, 0, 0);
		newBulletDataRef.set(bullet);
		myBullets.push({ref: newBulletDataRef, bullet:bullet});
	} else if (this.weapon === Weapons.DUAL) {
		var derp_offsets = [-Math.PI/2, Math.PI/2];
		$.each(derp_offsets, function(index, offset){
			var newBulletDataRef = bulletsDataRef.push();
            newBulletDataRef.onDisconnect().remove();
			var bullet = new Bullet(player, 0, offset, 3);
			newBulletDataRef.set(bullet);
			myBullets.push({ref: newBulletDataRef, bullet:bullet});
		});
	} else if (this.weapon >= Weapons.SPREAD) {
		var direction_offsets = [-0.1, 0, 0.1];
		$.each(direction_offsets, function(index, offset){
			var newBulletDataRef = bulletsDataRef.push();
            newBulletDataRef.onDisconnect().remove();
			var bullet = new Bullet(player, offset, 0, 0);
			newBulletDataRef.set(bullet);
			myBullets.push({ref: newBulletDataRef, bullet:bullet});
		});
	}
	playSound(Keys.SHOOT);
}

Player.prototype.update = function() {
    if (Keys.isMoving()) {

        if (Keys.isDown(Keys.UP) && Keys.isDown(Keys.RIGHT)) {
            this.move(Math.PI / 4);
        }
        else if (Keys.isDown(Keys.UP) && Keys.isDown(Keys.LEFT)) {
            this.move(3 * Math.PI / 4);
        }
        else if (Keys.isDown(Keys.DOWN) && Keys.isDown(Keys.LEFT)) {
            this.move(5 * Math.PI / 4);
        }
        else if (Keys.isDown(Keys.DOWN) && Keys.isDown(Keys.RIGHT)) {
            this.move(7 * Math.PI / 4);
        }
        else if (Keys.isDown(Keys.DOWN)) {
            this.move(3 * Math.PI / 2);
        }
        else if (Keys.isDown(Keys.UP)) {
            this.move(Math.PI / 2);
        }
        else if (Keys.isDown(Keys.RIGHT)) {
            this.move(0);
        }
        else if (Keys.isDown(Keys.LEFT)) {
            this.move(Math.PI);
        }
    }

    if (this.health <= 0) {
        var color = player.color;
        player = new Player(player.name, player.id);
        player.color = color;
    }

    localPlayerDataRef.set(player);

}

var setupPlayersFirebase = function() {

    playersDataRef = new Firebase(firebaseUrl + 'players');
    playersDataRef.on('child_added', function(snapshot){
        var new_player = snapshot.val();
        new_player.id = snapshot.name();
		limitFeedLength()
		$('#feed').append('<div><span style="color:' + new_player.color + '">' + new_player.name + ' joined</span><br></div>');
        players.push(new_player);
    });
    playersDataRef.on('child_removed', function(snapshot){
      	limitFeedLength()
		$('#feed').append('<div><span style="color:' + snapshot.val().color + '">' + snapshot.val().name + ' left</span><br></div>');
        // ok this is retarted but js is even more retarted
        for (var i=0; i<players.length; i++){
            if (players[i].id == snapshot.name()){
                players.splice(i, 1);
            }
        }
    });
    playersDataRef.on('child_changed', function(snapshot){
        for (var i=0; i<players.length; i++){
            if (players[i].id == snapshot.name()){
                players[i] = snapshot.val();
                players[i].id = snapshot.name();
            }
        }
    });


    // tracking when my player is hit
    hitsDataRef = new Firebase(firebaseUrl + 'hits');
    hitsDataRef.on('child_added', function(snapshot){
        if (snapshot.val().to == player.id) {
            // ouch, got hit!
            player.health -= snapshot.val().size;
            localPlayerDataRef.set(player);
            hitsDataRef.child(snapshot.name()).remove();
        }
    });
}

var limitFeedLength = function() {
	while($('#feed > div').length > 9){
		$('#feed > div').first().remove()
	}
}

var createPlayer = function(name) {
    localPlayerDataRef = playersDataRef.push();
    localPlayerDataRef.onDisconnect().remove();
	player_id = localPlayerDataRef.name();
    player = new Player(name, player_id);
    localPlayerDataRef.set(player);
}

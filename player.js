var Keys = {
    UP: 87, // w
    DOWN: 83, // s
    LEFT: 65, // a
    RIGHT: 68, // d
    SHOOT: 32, // space

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
        this._pressed[event.keyCode] = true;
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
};

Player = function(name){
    this.name = name;
    this.score = 0;
    this.x = map_dimensions.x / 2;
    this.y = map_dimensions.y / 2;
    this.direction = 0;
    this.color = randomBrightColor();
}

Player.prototype.move = function(direction) {
    var speed = 1;
    var x = this.x + speed * Math.cos(direction);
    var y = this.y - speed * Math.sin(direction);
    this.direction = direction;
    if (map.canMove(x, y)) {
        this.x = x;
        this.y = y;
    }
    localPlayerDataRef.set(player);
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
    if (Keys.isDown(Keys.SHOOT)) {
		playSound(Keys.SHOOT);
    }

}

var setupPlayersFirebase = function() {

    playersDataRef = new Firebase(firebaseUrl + 'players');
    playersDataRef.on('child_added', function(snapshot){
        var new_player = snapshot.val();
        new_player.id = snapshot.name();
        $('#feed').append('<span style="color:' + new_player.color + '">' + new_player.name + ' joined</span><br>');
        players.push(new_player);
    });
    playersDataRef.on('child_removed', function(snapshot){
        $('#feed').append('<span style="color:' + snapshot.val().color + '">' + snapshot.val().name + ' left</span><br>');
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
}


var createPlayer = function(name) {
    localPlayerDataRef = playersDataRef.push();
    localPlayerDataRef.onDisconnect().remove();
    player = new Player(name);
    localPlayerDataRef.set(player);
}

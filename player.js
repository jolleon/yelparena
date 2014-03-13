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
    this.x = map.x / 2;
    this.y = map.y / 2;
    this.direction = 0;
    this.color = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'][Math.floor(Math.random()*6)];
}


Player.prototype.update = function() {
    if (Keys.isDown(Keys.DOWN)) {
        this.y += 1;
        this.direction = 3 * Math.PI / 2;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.UP)) {
        this.y -= 1;
        this.direction = Math.PI / 2;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.RIGHT)) {
        this.x += 1;
        this.direction = 0;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.LEFT)) {
        this.x -= 1;
        this.direction = Math.PI;
        localPlayerDataRef.set(player);
    }
}

var setupPlayersFirebase = function() {

    playersDataRef = new Firebase(firebaseUrl + 'players');
    playersDataRef.on('child_added', function(snapshot){
        var new_player = snapshot.val();
        new_player.id = snapshot.name();
        $('#feed').append(new_player.name + ' joined<br>');
        players.push(new_player);
    });
    playersDataRef.on('child_removed', function(snapshot){
        $('#feed').append(snapshot.val().name + ' left<br>');
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

var Keys = {
    DOWN: 40, // down
    RIGHT: 39, // right
    SPACE: 32,

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
    this.color = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'][Math.floor(Math.random()*6)];
}


var updateGame = function() {
    if (Keys.isDown(Keys.DOWN)) {
        player.y += 1;
        localPlayerDataRef.set(player);
    }

}

var drawGame = function() {
    clearCanvas();
    for(var i=0; i<players.length; i++){
        var p = players[i];
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
    }

}

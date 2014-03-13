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
    this.color = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'][Math.floor(Math.random()*6)];
}

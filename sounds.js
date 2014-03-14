var pewSound = new Audio('pew.wav');
var explosionSound = new Audio('explosion.wav');

var playSound = function(key) {
	if (key == Keys.SHOOT) {
		pewSound.play();
	}
}

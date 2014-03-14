var pewSound = new Audio('pew.wav');

var playSound = function(key) {	
	if (key == Keys.SHOOT) {
		pewSound.play();
	}
}

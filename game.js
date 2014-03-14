var canvas = $('#main').get(0);
var ctx = canvas.getContext("2d");
var map = new Map(canvas.height, canvas.width);

var clearCanvas = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var resizeCanvas = function(w, h){
    if (h == undefined){
        var feedWidth = $('#feed').width();
        var infoHeight = $('#info').height();
        canvas.width = window.innerWidth - feedWidth - 10;
        canvas.height = window.innerHeight - infoHeight - 10;
    } else {
        canvas.width = w;
        canvas.height = h;
    }
}

var startAnimation = function(){
    var requestAnimFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null ;

    if ( requestAnimFrame !== null ) {

        var recursiveAnim = function() {
            mainloop();
            requestAnimFrame( recursiveAnim, canvas );
        };

        // start the mainloop
        requestAnimFrame( recursiveAnim, canvas );
    } else {
        var ONE_FRAME_TIME = 1000.0 / 60.0 ;
        setInterval( mainloop, ONE_FRAME_TIME );
    }
};


var mainloop = function(){
    updateGame();
    drawGame();
}

$(document).ready(function() {

    // setup fullscreen button
    if (fullScreenApi.supportsFullScreen) {
        $('#fullscreen').click(function() {
            fullScreenApi.requestFullScreen($('body').get(0));
        });
    }

    firebaseUrl = 'https://yelparena.firebaseio.com/'
    mapDataRef = new Firebase(firebaseUrl + 'map');
    map_dimensions = {'x': 0, 'y': 0};
    players = [];

    mapDataRef.on('value', function(snapshot){
        map_dimensions = snapshot.val();
        resizeCanvas(map_dimensions.x, map_dimensions.y);
        clearCanvas();

    });

    $('#name-prompt button').click(function(e){
        name = $('#name-prompt input').val();
        $('#name-prompt').attr('style', 'display:none');

        setupPlayersFirebase();
        createPlayer(name);
        // start the loop
        startAnimation();

        // listen to key press
        window.addEventListener('keyup', function(event){Keys.onKeyup(event);}, false);
        window.addEventListener('keydown', function(event){Keys.onKeydown(event);}, false);
    });

});

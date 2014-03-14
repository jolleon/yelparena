var talkServiceUrl = 'http://lukas.dev.yelp.com:7777/yelployees/talk';
var photoServiceUrl = 'http://lukas.dev.yelp.com:7777/yelployees';

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


function hexToRgba(hex, a) {
    var rgb = hexToRgb(hex);
    return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a + ')';
}


function randomBrightColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    r = g = b = 0;
    while (r + g + b < 16) {
        r = Math.floor(Math.random() * 16);
        g = Math.floor(Math.random() * 16);
        b = Math.floor(Math.random() * 16);
    }
    color += letters[r];
    color += letters[g];
    color += letters[b];
    return color;
}

/* Gets talk string and calls callback
 * playerTalk('lukas', consoleLog)
 */
function playerTalk(yelp_id, callback) {
	var text = ':(';
	var tries = 5;
	for (var i = 0; i < tries; i++) {
		$.ajax({
			type: 'GET',
			url: talkServiceUrl,
			data: { yelp_id : yelp_id},
			async: false
		}).done(function(data) {
			var talkString = '';
			if (typeof(data.response) !== 'undefined') {
				console.log(data['response']);
				if ((data['response'].indexOf('http') === -1) && (data['response'].length < 120)) {
					text = data['response'];
				}
			}
		});
		if (text !== ':(') {
			break;
		}
	}
	callback(yelp_id, text);
}

/* Gets player's photo url and calls callback
 * playerPhoto('lukas', consoleLog)
 */
function playerPhoto(yelp_id, callback) {
	$.ajax({
		type: 'GET',
		url: photoServiceUrl,
		data: { yelp_id : yelp_id}
	}).done(function(data) {
		var photoUrl = '';
		if (data.length > 0) {
			photoUrl = data[0]['photo_urls'][0];
		}
		callback(yelp_id, photoUrl);
	});
}

/* Log text to console */
function consoleLog(text1, text2) {
	console.log(text1, text2);
}

function get_distance(point1, point2) {
	var delta_x = point1.x - point2.x;
	var delta_y = point1.y - point2.y;

	return Math.sqrt(Math.pow(delta_x, 2) + Math.pow(delta_y, 2));
}
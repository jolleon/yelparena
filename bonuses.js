
BONUS_TYPES = ['health', 'player_speed', 'weapon', 'damage']; //  'bullet_speed'];

Bonus = function(position) {
    this.x = position.x;
    this.y = position.y;
    this.type = BONUS_TYPES[Math.floor(Math.random() * BONUS_TYPES.length)];
}



maybe_spawn_bonus = function() {
    if (Math.random() < 0.001 && bonuses.length < 10){
        var position = map.newPlayerCoordinates();
        var new_bonus = new Bonus(position);
        bonusesDataRef.push(new_bonus);
    }
    

}


apply_bonus = function(player, bonus){
    if (bonus.type == 'health'){
        player.health += 5;
    }
    else if (bonus.type == 'player_speed'){
        player.speed *= 1.15;
        if (player.speed > 7){
            player.speed = 7;
        }
    }
    else if (bonus.type == 'weapon'){
        player.weapon += 1;
	}	
    else if (bonus.type == 'damage') {
		player.bulletSize++;
    }
}


update_bonuses = function() {
    for (var i = 0; i < bonuses.length; i++){
        var bonus = bonuses[i];
        bonus.alpha += 0.01 * bonus.alpha_dir;
        if (bonus.alpha < 0.2){
            bonus.alpha = 0.2;
            bonus.alpha_dir = 1;
        } else if (bonus.alpha > 1) {
            bonus.alpha = 1;
            bonus.alpha_dir = -1;
        }
        if (get_distance(player, bonus) < 20){
            console.log(player, bonus);
            apply_bonus(player, bonus);
            bonusesDataRef.child(bonus.id).remove();
        }
    }
    maybe_spawn_bonus();
}


setupBonuses = function() {
    bonuses = [];
    bonusesDataRef = new Firebase(firebaseUrl + 'bonuses');
    bonusesDataRef.on('child_added', function(snapshot){
        var new_bonus = snapshot.val();
        new_bonus.id = snapshot.name();
        new_bonus.alpha = 0;
        new_bonus.alpha_dir = 1;
        bonuses.push(new_bonus);
    });
    bonusesDataRef.on('child_removed', function(snapshot){
        for (var i=0; i<bonuses.length; i++){
            if (bonuses[i].id == snapshot.name()){
                bonuses.splice(i, 1);
            }
        }
    });
}

drawBonuses = function() {
    for (var i = 0; i < bonuses.length; i++){
        var bonus = bonuses[i];
        var bSize = 10;
        var color = 'white';
        var text = '?';
        
        if (bonus.type == 'health'){
            color = '#0f0';
            text = 'H';
        }
        else if (bonus.type == 'player_speed'){
            color = '#ff0';
            text = 'S';
        }
        else if (bonus.type == 'weapon'){
            color = '#f0f';
            text = 'W';
        }
        else if (bonus.type == 'damage'){
            color = '#f00';
            text = 'D';
        }
        
        color = hexToRgba(color, bonus.alpha);
        var rad = ctx.createRadialGradient(
            bonus.x, bonus.y, 0,
            bonus.x, bonus.y, bSize)
        rad.addColorStop(0.4, 'rgba(0,0,0,0)');
        rad.addColorStop(0.7, color);
        rad.addColorStop(0.9, 'rgba(0,0,0,0)');
        ctx.fillStyle = rad;
        ctx.fillRect(bonus.x - bSize, bonus.y - bSize, 2 * bSize, 2 * bSize);
        ctx.fillStyle = color;
        ctx.fillText(text, bonus.x - 3, bonus.y + 3);
    }
}

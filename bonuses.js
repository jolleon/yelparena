BONUS_TYPES = ['health']; //, 'weapon', 'damage', 'player_speed', 'bullet_speed'];

Bonus = function() {
    this.x = 200;
    this.y = 100;
    this.type = BONUS_TYPES[Math.floor(Math.random() * BONUS_TYPES.length)];
}


maybe_spawn_bonus = function() {
    if (Math.random() < 0.05){
        var new_bonus = new Bonus();
        bonusesDataRef.push(new_bonus);
    }
    

}


apply_bonus = function(player, bonus){
    if (bonus.type == 'health'){
        player.health += 5;
    }
}


update_bonuses = function() {
    for (var i = 0; i < bonuses.length; i++){
        var bonus = bonuses[i];
        if (get_distance(player, bonus) < 30){
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
        if (bonus.type == 'health'){
            var rad = ctx.createRadialGradient(
                bonus.x, bonus.y, 0,
                bonus.x, bonus.y, bSize)
            rad.addColorStop(0.4, 'rgba(0,0,0,0)');
            rad.addColorStop(0.7, 'rgba(0,255,0,1)');
            rad.addColorStop(0.9, 'rgba(0,0,0,0)');
            ctx.fillStyle = rad;
            ctx.fillRect(bonus.x - bSize, bonus.y - bSize, 2 * bSize, 2 * bSize);

        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(bonuses[i].x, bonuses[i].y, 20, 20);
        }
    }
}

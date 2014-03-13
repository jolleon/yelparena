
var updateGame = function() {
    // controls
    if (Keys.isDown(Keys.DOWN)) {
        player.y += 1;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.UP)) {
        player.y -= 1;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.RIGHT)) {
        player.x += 1;
        localPlayerDataRef.set(player);
    }
    if (Keys.isDown(Keys.LEFT)) {
        player.x -= 1;
        localPlayerDataRef.set(player);
    }
}

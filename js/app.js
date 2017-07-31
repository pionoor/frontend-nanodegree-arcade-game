// Enemies our player must avoid
var score = 0;

//Ranged random Integer generator.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}



var Enemy = function(x, y, speed) {
    this.x =  x * 101;
    this.y =  y * 74;

    this.speed = speed;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += Math.floor(this.speed * dt);

    if (this.x >= 505) {
        this.x = 0;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.checkCollisions();
    
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//check if the enemy has colided with the player
Enemy.prototype.checkCollisions = function(){
    if (Math.abs(this.y - player.y) < 20) {
                console.log("checkCollisions");

        if (Math.abs(this.x - player.x) < 50 ) {
            player.resetPosition();
            this.randomizePosition();
            
            
        }
    } 
}
//this function will reposition the enemy randomly
Enemy.prototype.randomizePosition = function(){
    this.x =  getRandomInt(0, 4) * 101;
    this.y =  getRandomInt(1, 4) * 74;
};


//------------------------------------Player-----------------------------------------
// Now write your own player class

var Player = function(){
    this.x = 2 * 101;
    this.y = 5 * 80;
    this.sprite = 'images/char-boy.png';

}

Player.prototype.update = function(dt) {
    this.isWinner();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPosition = function(){
     this.x = 2 * 101;
    this.y = 5 * 80;
}

//check if the player has reached the water.
Player.prototype.isWinner = function(){
    if (this.y == 0) {
        this.resetPosition();
        $(".score").text("Score: " + ++score); 
            allEnemies.forEach(function(enemy){
            enemy.randomizePosition();
         });
        }
   
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.handleInput = function(key){

    
        switch (key){
            case "left":
                if (this.x > 0) {
                    this.x -= 101;
                }
                break;
                
            case "right":
                if (this.x < 404) {
                    this.x += 101;
                }
                break;

            case "up":
                if (this.y > 0) {
                    this.y -= 80;
                }
                break;

            case "down":
                if (this.y < 400) {
                    this.y += 80;
                }
                break;
        }    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
allEnemies.push(new Enemy(getRandomInt(0, 4), getRandomInt(1, 4), 100));
allEnemies.push(new Enemy(getRandomInt(0, 4), getRandomInt(1, 4), 100));
allEnemies.push(new Enemy(getRandomInt(0, 4), getRandomInt(1, 4), 100));


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//this disables arrow keys scrolling 
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

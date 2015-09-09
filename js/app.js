/* ----------------- GLOBAL VARIABLES --------------------- */
/* We define here the variables that we will be using through app.js and engine.js
 * for different things. They are used for the current stats (hearts, lifes, gems, game_over, etc).
 */

var CURRENT_LIFES = 5;      // number of current lifes
var CURRENT_KEYS = 0;       // number of current keys
var CURRENT_LEVEL = 0;      // level of the screen
var HAS_BLUE_GEM = false;   // has picked the blue gem
var HAS_GREEN_GEM = false;  // has picked the green gem
var HERO = "char-horn-girl";// choosen hero
var DIFFICULTY = 0;         // choosen level of difficulty
var PREVIOUS_X = 0;         // set previous X each time we update
var PREVIOUS_Y = 0;         // set previous y each time we update
var START_X = 0;            // set starting player position for the level
var START_Y = 0;            // set starting player position for the level
var NEXT_LEVEL = true;      // if we can change level, this is true to enable 'enter' key
var GAME_OVER = false;      // boolean to know when we die
var GAME_FINAL = false;     // boolean to know when we finish 

// Put the variables on screen to appear in the menu html
document.getElementById('numberLifes').innerHTML = CURRENT_LIFES.toString();
document.getElementById('numberKeys').innerHTML = CURRENT_KEYS.toString();
document.getElementById('numberLevel').innerHTML = CURRENT_LEVEL.toString();
if (HAS_BLUE_GEM) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-blue.png'>";
}
if (HAS_GREEN_GEM) {
    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-green.png'>";
}


/* -------------------- OBSTACLES & ITEMS ------------------------- */

/* Implement the Items class, with 4 parameters: 
 * position of the item, sprite to put the image, and the property "item".
 * With "item" we will be able to differentiate the obstacles, 
 * depending if they are: house, door, tree, rock, gem or chest. 
 * This way, we only need to create 1 function for all the types of items.
 */
var Items = function(x, y, sprite, item) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/' + sprite + '.png';
    this.item = item;
}

// Draw the items on the screen
Items.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/* TODO: find a better way to create the obstacles for each level
 * (an external json to access it?). This can't be efficient... 
 */

var allObstacles = [];
var allItems = [];
 
// Create function that will be called when changing level, to put all the obstacles of
// the next level in the canvas (house, door, trees, rocks, water, keys, lifes and chest)
var itemsReset = function(level) {
    switch (level) {
        
        case 1:     // LEVEL 1 CANVAS
        
            // house
            allObstacles[0] = new Items(303, 45, 'window-tall', 'house');
            allObstacles[1] = new Items(404, 60, 'door-tall-closed', 'door');
            allObstacles[2] = new Items(505, 45, 'window-tall', 'house');
            allObstacles[3] = new Items(303, -40, 'roof-south-west', 'house');
            allObstacles[4] = new Items(404, -40, 'roof-south', 'house');
            allObstacles[5] = new Items(505, -40, 'roof-south-east', 'house');
            
            // row 1
            allObstacles[6] = new Items(0, -25, 'tree-short', 'tree');
            allObstacles[7] = new Items(101, -25, 'tree-short', 'tree');
            allObstacles[8] = new Items(202, -25, 'tree-short', 'tree');
            allObstacles[9] = new Items(606, -25, 'tree-short', 'tree');
            allObstacles[10] = new Items(707, -25, 'tree-short', 'tree');
            allObstacles[11] = new Items(808, -25, 'tree-short', 'tree');
            // row 3
            allObstacles[12] = new Items(606, 141, 'tree-ugly', 'tree');
            // row 4
            allObstacles[13] = new Items(101, 224, 'tree-ugly', 'tree');
            allObstacles[14] = new Items(606, 224, 'tree-ugly', 'tree');
            allObstacles[15] = new Items(707, 224, 'rock', 'rock');
            // row 5
            allObstacles[16] = new Items(303, 307, 'tree-ugly', 'tree');
            // row 7
            allObstacles[17] = new Items(505, 470, 'rock', 'rock');
            
            allItems[0] = new Items(707, 131, 'key', 'key');
            allItems[1] = new Items(101, 131, 'key', 'key');
            allItems[2] = new Items(0, 465, 'heart', 'life');
        
            break;
        
        case 2:     // LEVEL 2 CANVAS        
            
            // house
            allObstacles[0] = new Items(0, 45, 'wood-block', 'house');
            allObstacles[1] = new Items(101, 60, 'door-tall-closed', 'door');
            allObstacles[2] = new Items(202, 45, 'wood-block', 'house');
            allObstacles[3] = new Items(0, -40, 'roof-south-west', 'house');
            allObstacles[4] = new Items(101, -40, 'roof-south', 'house');
            allObstacles[5] = new Items(202, -40, 'roof-south-east', 'house');
        
            // row 1
            allObstacles[6] = new Items(303, -25, 'blanc', 'water');
            allObstacles[7] = new Items(404, -25, 'blanc', 'water');
            allObstacles[8] = new Items(505, -25, 'blanc', 'water');
            allObstacles[9] = new Items(606, -25, 'blanc', 'water');
            allObstacles[10] = new Items(707, -25, 'blanc', 'water');
            allObstacles[11] = new Items(808, -25, 'blanc', 'water');
            // row 2
            allObstacles[12] = new Items(303, 58, 'tree-ugly', 'tree');
            // row 3
            allObstacles[13] = new Items(404, 141, 'tree-tall', 'tree');
            allObstacles[14] = new Items(707, 141, 'tree-ugly', 'tree');
            // row 4
            allObstacles[15] = new Items(101, 224, 'tree-ugly', 'tree');
            allObstacles[16] = new Items(707, 224, 'tree-ugly', 'tree');
            allObstacles[17] = new Items(808, 224, 'tree-ugly', 'tree');
            // row 5
            allObstacles[18] = new Items(101, 307, 'tree-ugly', 'tree');
            // row 6
            allObstacles[19] = new Items(505, 390, 'rock', 'rock');
            // row 7
            allObstacles[20] = new Items(0, 470, 'rock', 'rock');
            allObstacles[21] = new Items(303, 470, 'tree-tall', 'tree');
            // row 8
            allObstacles[22] = new Items(303, 556, 'rock', 'rock');
            allObstacles[23] = new Items(404, 556, 'tree-tall', 'tree');
            allObstacles[24] = new Items(505, 556, 'tree-tall', 'tree');
                
            allItems[0] = new Items(808, 131, 'key', 'key');
            allItems[1] = new Items(0, 297, 'key', 'key');
            allItems[2] = new Items(606, 48, 'heart', 'life');
            allItems[3] = new Items(202, 465, 'chest-closed', 'chest-green');
            allItems[4] = new Items(202, 400, 'blanc', 'chest-lid');
        
            break;
            
        case 3:     // LEVEL 3 CANVAS
            
            // house
            allObstacles[0] = new Items(707, 224, 'window-tall', 'house');
            allObstacles[1] = new Items(808, 234, 'door-tall-closed', 'door');
            allObstacles[2] = new Items(707, 58, 'roof-north-west', 'house');
            allObstacles[3] = new Items(808, 58, 'roof-north-east', 'house');
            allObstacles[4] = new Items(707, 141, 'roof-south-west', 'house');
            allObstacles[5] = new Items(808, 141, 'roof-south-east', 'house');
            
            // row 1
            allObstacles[6] = new Items(101, -25, 'tree-tall', 'tree');
            allObstacles[7] = new Items(202, -25, 'tree-ugly', 'tree');
            allObstacles[8] = new Items(303, -25, 'tree-ugly', 'tree');
            allObstacles[9] = new Items(404, -25, 'tree-ugly', 'tree');
            allObstacles[10] = new Items(505, -25, 'rock', 'rock');
            // row 2
            allObstacles[11] = new Items(101, 58, 'tree-tall', 'tree');
            allObstacles[12] = new Items(202, 58, 'tree-tall', 'tree');
            allObstacles[13] = new Items(505, 58, 'tree-ugly', 'tree');
            allObstacles[14] = new Items(606, 58, 'tree-ugly', 'tree');
            // row 3
            allObstacles[15] = new Items(0, 141, 'rock', 'rock');
            allObstacles[16] = new Items(101, 141, 'rock', 'rock');    
            allObstacles[17] = new Items(202, 141, 'tree-ugly', 'tree');
            allObstacles[18] = new Items(404, 141, 'rock', 'rock');
            allObstacles[19] = new Items(505, 141, 'tree-tall', 'tree');
            allObstacles[20] = new Items(606, 141, 'tree-tall', 'tree');
            // row 4
            allObstacles[21] = new Items(0, 224, 'blanc', 'water');
            allObstacles[22] = new Items(101, 224, 'blanc', 'water');    
            allObstacles[23] = new Items(202, 224, 'tree-ugly', 'tree');
            allObstacles[24] = new Items(404, 224, 'tree-tall', 'tree');
            allObstacles[25] = new Items(505, 224, 'tree-tall', 'tree');
            allObstacles[26] = new Items(606, 224, 'tree-tall', 'tree');
            // row 5
            allObstacles[27] = new Items(0, 307, 'blanc', 'water');
            allObstacles[28] = new Items(101, 307, 'blanc', 'water');    
            allObstacles[29] = new Items(404, 307, 'tree-tall', 'tree');
            allObstacles[30] = new Items(606, 307, 'tree-ugly', 'tree');
            allObstacles[31] = new Items(707, 307, 'tree-ugly', 'tree');
            // row 6
            allObstacles[32] = new Items(0, 390, 'blanc', 'water');
            allObstacles[33] = new Items(101, 390, 'blanc', 'water');    
            allObstacles[34] = new Items(606, 390, 'tree-ugly', 'tree');
            allObstacles[35] = new Items(707, 390, 'tree-ugly', 'tree');
            // row 7
            allObstacles[36] = new Items(303, 470, 'tree-ugly', 'tree');
            allObstacles[37] = new Items(404, 470, 'tree-ugly', 'tree');
            // row 8
            allObstacles[38] = new Items(303, 556, 'tree-ugly', 'tree');
            allObstacles[39] = new Items(404, 556, 'tree-tall', 'tree');
            allObstacles[40] = new Items(606, 556, 'rock', 'rock');
            allObstacles[41] = new Items(707, 556, 'tree-tall', 'tree');
            allObstacles[42] = new Items(808, 556, 'tree-tall', 'tree');
        
            allItems[0] = new Items(505, 546, 'key', 'key');
            allItems[1] = new Items(808, -35, 'heart', 'life');
            allItems[2] = new Items(0, -35, 'chest-closed', 'chest-blue');
            allItems[3] = new Items(0, -100, 'blanc', 'chest-lid');
        
            break;
        
        case 4:     // LEVEL 4 CANVAS
                
            // house
            allObstacles[0] = new Items(505, 470, 'window-tall', 'house');
            allObstacles[1] = new Items(606, 480, 'door-tall-closed', 'door');
            allObstacles[2] = new Items(707, 470, 'window-tall', 'house');
            allObstacles[3] = new Items(505, 307, 'roof-north-west', 'house');
            allObstacles[4] = new Items(606, 307, 'roof-north', 'house');
            allObstacles[5] = new Items(707, 307, 'roof-north-east', 'house');
            allObstacles[6] = new Items(505, 390, 'roof-south-west', 'house');
            allObstacles[7] = new Items(606, 390, 'roof-south', 'house');
            allObstacles[8] = new Items(707, 390, 'roof-south-east', 'house');
            
            // row 1
            allObstacles[9] = new Items(303, -25, 'blanc', 'water');
            allObstacles[10] = new Items(404, -25, 'blanc', 'water');
            // row 2
            allObstacles[11] = new Items(101, 83, 'blanc', 'water');
            allObstacles[12] = new Items(808, 58, 'rock', 'rock');
            // row 3
            allObstacles[13] = new Items(101, 166, 'blanc', 'water');
            allObstacles[14] = new Items(202, 166, 'blanc', 'water');
            allObstacles[15] = new Items(404, 166, 'blanc', 'water');
            allObstacles[16] = new Items(505, 166, 'blanc', 'water');
            allObstacles[17] = new Items(606, 166, 'blanc', 'water');
            allObstacles[18] = new Items(707, 166, 'blanc', 'water');
            allObstacles[19] = new Items(808, 141, 'rock', 'rock');
            // row 4
            allObstacles[20] = new Items(101, 249, 'blanc', 'water');
            allObstacles[21] = new Items(202, 249, 'blanc', 'water');
            allObstacles[22] = new Items(404, 249, 'blanc', 'water');
            allObstacles[23] = new Items(505, 249, 'blanc', 'water');
            allObstacles[24] = new Items(606, 249, 'blanc', 'water');
            allObstacles[25] = new Items(707, 249, 'blanc', 'water');
            allObstacles[26] = new Items(808, 249, 'blanc', 'water');
            // row 5
            allObstacles[27] = new Items(202, 307, 'tree-ugly', 'tree');
            allObstacles[28] = new Items(404, 307, 'blanc', 'water');
            allObstacles[29] = new Items(808, 307, 'blanc', 'water');
            // row 6
            allObstacles[30] = new Items(0, 390, 'rock', 'rock');
            allObstacles[31] = new Items(101, 390, 'rock', 'rock');
            allObstacles[32] = new Items(202, 390, 'tree-ugly', 'tree');
            allObstacles[33] = new Items(808, 415, 'blanc', 'water');
            // row 7
            allObstacles[34] = new Items(0, 498, 'blanc', 'water');
            allObstacles[35] = new Items(101, 498, 'blanc', 'water');
            allObstacles[36] = new Items(202, 498, 'blanc', 'water');
            allObstacles[37] = new Items(303, 498, 'blanc', 'water');
            allObstacles[38] = new Items(808, 498, 'blanc', 'water');
            // row 8
            allObstacles[39] = new Items(0, 581, 'blanc', 'water');
            allObstacles[40] = new Items(101, 581, 'blanc', 'water');
            allObstacles[41] = new Items(202, 581, 'blanc', 'water');
            allObstacles[42] = new Items(303, 581, 'blanc', 'water');
            allObstacles[43] = new Items(707, 581, 'blanc', 'water');
            allObstacles[44] = new Items(808, 581, 'blanc', 'water');
            
            allItems[0] = new Items(101, 297, 'key', 'key');
            allItems[1] = new Items(505, 214, 'heart', 'life');
        
            break;
    }
 }


/* ------------------ ENEMIES ---------------------- */

/* Implement the Enemiy class, to create the enemies our player must avoid
 * We have the 2 parameters to initialize the enemy position
 * and 3 parameters to create different types of movement for the bugs
 */
var Enemy = function(x, y, moveRight, startMove, endMove) {
    // Setting the initial location and speed
    this.x = x;
    this.y = y;
    this.startMove = startMove;
    this.endMove = endMove;
    this.moveRight = moveRight;
    
    //this.speed = 150; // this one is for testing the game
    if (CURRENT_LEVEL === 1) {
        this.speed = Math.floor(Math.random() * 450 + 1);
        //console.log(Math.floor(Math.random() * 450 + 1));
    } else {
        this.speed = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    }
    
    // Loading the image by setting this.sprite to the appropriate image
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    
    /* TODO: we are using too many times the same if's,
     * there has to be a better way to write the code,
     * maybe implement functions for each type of movement and call them here?
     */
    
    switch (CURRENT_LEVEL) {
        case 1:
            // Updates the Enemy location, that goes from left to right
            this.x += this.speed * dt;
            
            // If the Enemy goes off screen, we reset the position to start again
            if (this.x > 909) {
                this.x = Math.random() * -1200;
            }
            break;
        
        case 2:
            // Updates the Enemy location, that goes back and forth in the same interval of positions
            if (this.moveRight) {
                this.x += this.speed * dt;
                this.sprite = 'images/enemy-bug.png';
                if (this.x > this.endMove) {
                    this.x -= this.speed * dt;
                    this.moveRight = false;
                }
            } else {
                // Going back right to left, we change sprites 
                this.x -= this.speed * dt;
                this.sprite = 'images/enemy-bug-left.png';
                if (this.x < this.startMove) {
                    this.x += this.speed * dt;
                    this.moveRight = true;
                }
            }
            break;
        
        case 3:
            // Updates the Enemy location, that goes back and forth in the same interval of positions
            if (this.moveRight) {
                this.x += this.speed * dt;
                this.sprite = 'images/enemy-bug.png';
                if (this.x > this.endMove) {
                    this.x -= this.speed * dt;
                    this.moveRight = false;
                }
            } else {
                // Going back right to left, we change sprites 
                this.x -= this.speed * dt;
                this.sprite = 'images/enemy-bug-left.png';
                if (this.x < this.startMove) {
                    this.x += this.speed * dt;
                    this.moveRight = true;
                }
            }
            break;
        
        case 4:
            if (this.endMove === 404) {
                // Updates the Enemy location, that goes back and forth in the same interval of positions
                if (this.moveRight) {
                    this.x += this.speed * dt;
                    this.sprite = 'images/enemy-bug.png';
                    if (this.x > this.endMove) {
                        this.x -= this.speed * dt;
                        this.moveRight = false;
                    }
                } else {
                    // Going back right to left, we change sprites 
                    this.x -= this.speed * dt;
                    this.sprite = 'images/enemy-bug-left.png';
                    if (this.x < this.startMove) {
                        this.x += this.speed * dt;
                        this.moveRight = true;
                    }
                }
            } else {
                if (this.moveRight) {
                    // Updates the Enemy location, that goes from left to right
                    this.x += this.speed * dt;
    
                    // If the Enemy goes off screen in the right, we reset the position to start again
                    if (this.x > 909) {
                        this.x = Math.random() * -1200;
                    }
                } else {
                    // Updates the Enemy location, that goes from right to left
                    this.x -= this.speed * dt;
                    this.sprite = 'images/enemy-bug-left.png';
                     
                    // If the Enemy goes off screen in the left, we reset the position to start again
                    if (this.x < -101) {
                        this.x = Math.floor(Math.random() * (1400 - 1000 + 1)) + 1000;
                    }
                }
            }
            break;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyHeight = [146,229,312,395,478];  // only used in level 1

/* Create function to reset the enemies, that will be called when we change levels,
 * where we draw the enemies of the next level on the canvas.
 * For each level varys to try different types of movements.
 */
var enemyReset = function(level) {
    
    switch(level) {
        case 1:
            // Here we create 10 enemies, 2 for each row, with a random initial left location and a random speed
            for (var i = 0; i < 10; i++) {
                allEnemies.push(new Enemy(-(Math.floor(Math.random() * 400 + 100)), enemyHeight[i % 5], true, 0, 808));
            }
            break;
    
        case 2:
            // Here we put 7 enemies in exact positions, that will go back and forth
            // using the positions that we pass in the parameters as startMove and endMove
            allEnemies.push(new Enemy(404, 63, true, 404, 808));
            allEnemies.push(new Enemy(0, 146, true, 0, 303));
            allEnemies.push(new Enemy(202, 229, true, 202, 606));
            allEnemies.push(new Enemy(202, 312, true, 202, 808));
            allEnemies.push(new Enemy(0, 395, true, 0, 404));
            allEnemies.push(new Enemy(606, 395, true, 606, 808));
            allEnemies.push(new Enemy(404, 478, true, 404, 606));
            break;
    
        case 3:
            // Here the same as level 2
            allEnemies.push(new Enemy(101, -20, true, 101, 808));
            allEnemies.push(new Enemy(303, 63, true, 303, 606));
            allEnemies.push(new Enemy(303, 146, true, 303, 606));
            allEnemies.push(new Enemy(202, 312, true, 202, 808));
            allEnemies.push(new Enemy(202, 395, true, 202, 808));
            allEnemies.push(new Enemy(202, 478, true, 202, 808));
            break;
    
        case 4:
            /* Here we combine: in rows with obstacles for the bugs (the house and the stone path), 
             * we create them as level 2, going back and forth.
             * In the other rows, we create as level 1, but with only 1 bug for row (2 bugs is too difficult).
             * But in some row they go left to right, and in some they go right to left.
             */
            allEnemies.push(new Enemy(0, -20, true, 0, 404));
            allEnemies.push(new Enemy(808, 63, false, 808, 0));
            allEnemies.push(new Enemy(0, 146, true, 0, 808));
            allEnemies.push(new Enemy(808, 229, false, 808, 0));
            allEnemies.push(new Enemy(0, 312, true, 0, 404));
            allEnemies.push(new Enemy(0, 395, true, 0, 404));
            allEnemies.push(new Enemy(0, 478, true, 0, 404));
            break;        
        }
}


/* ------------------ PLAYER ------------------------- */

// Implement the Player class
var Player = function(x,y) {
    // Setting the Player initial location
    this.x = x;
    this.y = y;
    
    // Inicializating the previous variables (we will use them in checkCollisions)
    PREVIOUS_X = x;
    PREVIOUS_Y = y;
           
    // Loading the image by setting this.sprite
    this.sprite = 'images/' + HERO + '.png';
}

// Update the player's position and check for any collision
Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;
    checkCollisions();
}

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// handleInput method receives the user input with parameter 'allowedKeys'
// The Player moves accordingly to that input
Player.prototype.handleInput = function(allowedKeys) {
    
    // If lifes = 0 it means game over, so we can't move anymore
    if (CURRENT_LIFES > 0) {
    
        switch(allowedKeys) {
                    
            case 'left':
                // we check to avoid player moving off-screen and update previous_x
                if (this.x > 0) {
                    PREVIOUS_X = this.x;
                    this.x -= 101;
                    break;
                }
        
            case 'up':
                //we check to avoid player moving off-screen and update previous_y
                if (this.y > 0) {
                    PREVIOUS_Y = this.y;
                    this.y -= 83;
                    break;
                }
        
            case 'right':
                // we check to avoid player moving off-screen and update previous_x
                if (this.x < 808) {
                    PREVIOUS_X = this.x;
                    this.x += 101;
                    break;
                }
        
            case 'down':
                // we check to avoid player moving off-screen and update previous_y
                if (this.y < 556) {
                    PREVIOUS_Y = this.y;
                    this.y += 83;
                    break;
                }
        
            case 'enter':
                if (GAME_OVER) {
                    // reset game
                    changeLevel(1);
                }
                if (NEXT_LEVEL) {
                    // change to the next level
                    changeLevel(CURRENT_LEVEL + 1);
                }
                break;
        }
    }
}

// Reset the player's position when it collides with a bug, and subtract a life
Player.prototype.reset = function() {
    CURRENT_LIFES = CURRENT_LIFES - 1;
    document.getElementById('numberLifes').innerHTML = CURRENT_LIFES.toString();
    
    // If after the subtraction of life we have 0 lifes --> it is Game Over
    if (CURRENT_LIFES === 0) {
        player.gameOver();
    } else {
        this.x = START_X;
        this.y = START_Y;
    }
}

// Create function to reset the players position to the initial for each level
// This function is called when we change level and are initializing the next level
Player.prototype.changeLevel = function(level) {
    //dialog = document.getElementById('dialog' + (CURRENT_LEVEL - 1)).hidden;
    switch (level) {
        case 1:
            this.x = 404;
            this.y = 556;
            START_X = 404;
            START_Y = 556;
            break;
        
        case 2:
            this.x = 808;
            this.y = 556;
            START_X = 808;
            START_Y = 556;
            break;
       
        case 3:
            this.x = 0;
            this.y = 556;
            START_X = 0;
            START_Y = 556;
            break;
        
        case 4:
            this.x = 606;
            this.y = -25;
            START_X = 606;
            START_Y = -25;
            break;
    }
}

// Stops de player when it tries to go over an obstacle (tree, rock, house, chest)
// TODO: it doesn't stop properly, it is going one position back
Player.prototype.stop = function() {
    this.x = PREVIOUS_X;
    this.y = PREVIOUS_Y;
}

// When we have 0 lifes, it is game over
Player.prototype.gameOver = function() {
    //console.log("Game Over");
    GAME_OVER = true;
    allEnemies = [];
    // TODO: make the 'enter' key clickable, to restart the game
}

// When we open the door in level 4, it is the final state of the game
Player.prototype.gameFinal = function() {
    GAME_FINAL = true;
    allEnemies = [];
}

// Place the player object in a variable called player
var player = new Player(START_X, START_Y);


/* -------------------- COLLISIONS & COLLECTIBLE ITEMS ---------------------- */

// Function to check if the player collides with something
var checkCollisions = function() {
    
    // Calculate the central Rectangle to avoid the blank space
    var Rectangle = function (left, top) {
	   this.left = left + 35;
	   this.top = top + 20;
	   this.right = this.left + 65;
	   this.bottom = this.top + 62;
    };
    
    // Check to see if the rectangles overlap
    function checkCollision(player, obstacle) {
	   return !(
           player.left > obstacle.right 
           || player.right < obstacle.left 
           || player.top > obstacle.bottom 
           || player.bottom < obstacle.top
           );
    };
    
    var playerRectangle = new Rectangle(player.x, player.y);
    
    // Check collision with enemy bugs
    for (var i = 0; i < allEnemies.length; i++) {
        var enemyRectangle = new Rectangle(allEnemies[i].x, allEnemies[i].y);
        if (checkCollision(playerRectangle, enemyRectangle)) {
            // If player collides with bug, reset position of player
            player.reset();            
        }
    }
    
    // Check collision with items
    for (var i = 0; i < allItems.length; i++) {
        var itemRectangle = new Rectangle(allItems[i].x, allItems[i].y);
        if (checkCollision(playerRectangle, itemRectangle)) {
                       
            switch(allItems[i].item) {
                // If it collides with a key --> pick up key, delete key from the array to make it dissapear from canvas
                case 'key':
                    CURRENT_KEYS = CURRENT_KEYS + 1;
                    document.getElementById('numberKeys').innerHTML = CURRENT_KEYS.toString();
                    allItems.splice(i,1);
                    break;
                
                // If it collides with a heart --> pick up heart, delete heart from the array to make it dissapear from canvas
                case 'life':
                    CURRENT_LIFES = CURRENT_LIFES + 1;
                    document.getElementById('numberLifes').innerHTML = CURRENT_LIFES.toString();
                    allItems.splice(i,1);
                    break;
                
                // If it collides with closed chest, check for key
                case 'chest-green':
                    if (CURRENT_KEYS > 0) {                        
                        // if we have key, open chest and player stops
                        allItems[i].item = 'gem-green';
                        allItems[i].sprite = 'images/chest-open-green.png';
                        allItems[i + 1].item = 'chest-open';
                        allItems[i + 1].sprite = 'images/chest-lid.png';
                        CURRENT_KEYS = CURRENT_KEYS - 1;
                        document.getElementById('numberKeys').innerHTML = CURRENT_KEYS.toString();
                        player.stop();
                        break;
                        
                    } else {
                        // if we don't have key, player stops
                        player.stop();    
                        break;
                    }
               
               // If it collides with closed chest, check for key
               case 'chest-blue':
                    if (CURRENT_KEYS > 0) {
                        // if we have key, open chest and player stops
                        allItems[i].item = 'gem-blue';
                        allItems[i].sprite = 'images/chest-open-blue.png';
                        allItems[i + 1].item = 'chest-open';
                        allItems[i + 1].sprite = 'images/chest-lid.png';
                        CURRENT_KEYS = CURRENT_KEYS - 1;
                        document.getElementById('numberKeys').innerHTML = CURRENT_KEYS.toString();
                        player.stop();
                        break;
                        
                    } else {
                        // if we don't have key, player stops
                        player.stop();    
                        break;
                    }
               
               // If it collides with open chest with gem --> pick up gem
               case 'gem-green':
                    HAS_GREEN_GEM = true;
                    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-green.png'>";
                    allItems[i].item = 'chest-open';
                    allItems[i].sprite = 'images/chest-open.png';
                    player.stop();
                    break;
               
               // If it collides with open chest with gem --> pick up gem
               case 'gem-blue':
                    HAS_BLUE_GEM = true;
                    document.getElementById('hasGems').innerHTML += "<img src='images/menu-gem-blue.png'>";
                    allItems[i].item = 'chest-open';
                    allItems[i].sprite = 'images/chest-open.png';
                    player.stop();
                    break;
               
               case 'chest-lid':
                    break;
               
               case 'chest-open':
                    break;
            }
        }
    }
    
    var dialog;
    
    // Check collision with objects (tree, house, door and rock)
    for (var i = 0; i < allObstacles.length; i++) {
        var obstacleRectangle = new Rectangle(allObstacles[i].x, allObstacles[i].y);
        if (checkCollision(playerRectangle, obstacleRectangle)) {
            
            // Player has found an obstacle that can't be crossed over
            switch(allObstacles[i].item) {
                case 'tree':
                    if (HAS_GREEN_GEM) {
                        // if player has gem, it can go over the trees
                        break;
                    } else {
                        player.stop();    
                        break;
                    }
                    console.log(HAS_GREEN_GEM);
                
                case 'water':
                    if (HAS_BLUE_GEM) {
                        // if player has gem, it can go over the water
                        break;
                    } else {
                        player.stop();    
                        break;
                    }
                
                case 'rock':
                    player.stop();                    
                    break;
                    
                case 'house':                    
                    player.stop();                    
                    break;
                    
                case 'door':
                    if (CURRENT_KEYS > 0) {
                        player.stop();
                        
                        // if we have key, open door of final level
                        if (CURRENT_LEVEL === 4) {
                            allObstacles[i].item = 'door-final';
                            allObstacles[i].sprite = 'images/door-tall-final.png';
                            dialog = document.getElementById('dialog' + CURRENT_LEVEL);
                            dialog.show();
                            player.gameFinal();
                        
                        // if we have key, open door
                        } else {
                            allObstacles[i].item = 'door-open';
                            allObstacles[i].sprite = 'images/door-tall-open.png';
                        }
                        CURRENT_KEYS = CURRENT_KEYS - 1;
                        document.getElementById('numberKeys').innerHTML = CURRENT_KEYS.toString();
                        break;
                        
                    } else {
                        player.stop();    
                        break;
                    }
                    
                case 'door-open':
                    // When we open door of level, it shows the message and it puts next_level to true,
                    // this way it enables key 'enter' to be used to go to next level.
                    player.sprite = 'images/' + HERO + '-sad.png';
                    dialog = document.getElementById('dialog' + CURRENT_LEVEL);
                    dialog.show();
                    NEXT_LEVEL = true;
                    // TODO: after dialog appeared, it should appear a screen with text and button to change to next level?
                    // TODO: dialog.show only works on Chrome... find alternative for Mozilla... :(
                    
                    // I am trying to implement the setTimeout to change levels automatically, but I want the player to wait
                    // some seconds before the change, this way the dialog will be shown and read
                    // It doesn't work though... 
                    
                    //delayTime = setTimeout(function() {  --> not working if I put it in a variable
                    setTimeout(function() {
                        player.sprite = 'images/' + HERO + '.png';
                        allEnemies = [];
                        allItems = [];
                        allObstacles = [];
                        CURRENT_LEVEL = CURRENT_LEVEL + 1;
                        document.getElementById('numberLevel').innerHTML = CURRENT_LEVEL.toString();
                        player.changeLevel(CURRENT_LEVEL);
                        itemsReset(CURRENT_LEVEL);
                        enemyReset(CURRENT_LEVEL);
                        NEXT_LEVEL = false;
                    },3000);
                    
                    clearTimeout();
                    
                    break;
            }
        }
    }
}

/* Function to change the level. It is called in handleInput, when player presses 'enter' key, if we have next_level true
 * First we change player's sprite to the happy one
 * Then we delete everything in allEnemies, allItems and allObstacles arrays (we don't want the things from the previous level to show)
 * Then we change the level, and we put the new level onscreen
 * After we call the 3 functions to reset the player's position, items and enemies position, passing the parameter of the next level
 * Finally next_level goes to false, because we can't change level again if we don't play all the level.
 */
var changeLevel = function(level) {
    // TODO: find a way to close de dialogs in the next level
    //dialog.close();
    //dialog = document.getElementById('dialog' + (CURRENT_LEVEL - 1)).hidden;
    player.sprite = 'images/' + HERO + '.png';
    allEnemies = [];
    allItems = [];
    allObstacles = [];
    CURRENT_LEVEL = level;
    document.getElementById('numberLevel').innerHTML = level.toString();
    player.changeLevel(level);
    itemsReset(level);
    enemyReset(level);
    NEXT_LEVEL = false;
}


/* ---------------------- KEYBOARD INPUT ---------------------------- */ 

// This listens for key presses and sends the keys to your Player.handleInput() method
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

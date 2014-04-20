/*
 Main class
 Programmer: Carette Antonin
 Date: 04/13/2014
 */
var canvas = document.getElementById("myCanvas");
var content = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
content.fillRect(0,0,width,height);
content.clearRect(0,0,width,height);

/*
 Counting the number of time we have fun!
 */
var count_grid = 0;
var max_count = 10;
/*
 Boolean to know if we are be able to continue to play, or not
 */
var continuePlay = true;

/*
 Coordinates of the player and the AI
 */
var xProgram = width - (width / 4);
var yProgram = height - (height / 2);
var xProgrammer = width - (3 * width / 4);
var yProgrammer = height - (height / 2);

incrementCountGrid = function() {
    count_grid+=1;
};

/*
 Two objects LightCycles: the player (Programmer) and the AI (Program)
 */
var program = new LightCycle("Program", xProgram, yProgram, "left", "orange");
var programmer = new LightCycle("Programmer", xProgrammer, yProgrammer, "right", "blue");

/*
 List of keys from keyboards available
 */
var keys = {
    left : [37,81],
    up: [38,90],
    right: [39,68],
    down: [40,83]
};

oppositeDirection = function(direction) {
    switch(direction) {
            case "up":
                return "down";
                break;
            case "down":
                return "up";
                break;
            case "left":
                return "right";
                break;
            case "right":
                return "left";
                break;
    }
}

/*
 Initialization function
 */
init = function() {
    Grid.start();
    setInterval(play, 100);
};

/*
 Principale function of the game
 */
play = function() {
    if (continuePlay) {
        programmer.move();
        programmer.render();
        if (programmer.collision(program)) Grid.renew(program);
        program.predict(programmer);
        program.render();
        if (program.collision(programmer)) Grid.renew(programmer);
        //Grid.getConsoleLogStart();
    }
    else {
        Grid.finish();
    }
};

/*
 Grid object - the "board"
 */
Grid = {
    
    height: canvas.height,
    width: canvas.width,
    
    checkRenew: function() {
        incrementCountGrid();
        if (count_grid >= max_count) {
            continuePlay = false;
        }
    },
    
    renew: function(player) {
        player.score += 1;
        Grid.reset();
        Grid.checkRenew();
        programmer.reset();
        program.reset();
    },
    
    getConsoleLogStart: function() {
        console.log(program.name+": "+program.score);
        console.log(programmer.name+": "+programmer.score);
    },
    
    getColorWinner: function(winner) {
        return winner.color;
    },
    
    resetCountGrid: function() {
        count_grid = 0;
    },
    
    resetPlayers: function() {
        program.reset();
        programmer.reset();
    },
    
    start: function() {
        Grid.reset();
        //Grid.getContentTextStart();
        Grid.resetCountGrid();
        Grid.resetPlayers();
    },
    
    returnWinner: function() {
        if (program.score > programmer.score) return program;
        if (program.score < programmer.score) return programmer;
        else return null;
    },
    
    finish: function() {
        Grid.getConsoleLogFinish(Grid.returnWinner());
    },
    
    getRectTextFont: function() {
        content.font = '25px sans-serif';
        content.textAlign = 'center';
    },
    
    getScore: function() {
        content.fillText(programmer.name+':'+programmer.score+' / '+program.name+':'+program.score, width/2, height/2 + 30);
    },
    
    
    getContentTextStart: function(){
        Grid.getRectTextFont();
        content.fillText('WELCOME!', width/2, height/3);
        content.fillText('You\'re the player to the left, don\'t forget it!',width/2, height/2);
    },
    
    getContentTextFinish: function(winner) {
        Grid.getRectTextFont();
        content.fillText('Score: ', width/2, height/2.5);
        content.fillText(winner.name+' is the winner! :-)', width/2, height/2);
        Grid.getScore();
    },
    
    getTextFinishNull: function() {
        content.fillText('NO WINNER', width/2, height/3);
        Grid.getScore();
    },
    
    getConsoleLogFinish: function(winner) {
        if (winner != null) {
            content.fillStyle = Grid.getColorWinner(winner);
            Grid.reset();
            Grid.getContentTextFinish(winner);
        }
        else {
            content.fillStyle = "black";
            Grid.reset();
            Grid.getTextFinishNull();
        }
    },
    
    reset:function(){
        content.clearRect(0,0,width,height);
    },
    
};

/*
 To get the direction give by the player
 */
Object.prototype.getKey = function(value) {
    for (var key in this) {
        if(this[key] instanceof Array && this[key].indexOf(value) >= 0) return key;
    }
    return null;
};

/*
 To do the action with the current direction
 */
addEventListener("keydown", function(k) {
                 var newDirection = keys.getKey(k.keyCode);
                 if (programmer.direction != oppositeDirection(newDirection)) programmer.direction = newDirection;
                 }, false);

window.onload = function() {
    init();
};
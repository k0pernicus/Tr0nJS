/*
    lightCycle class
    Programmer: Carette Antonin
    Date: 04/13/2014
 */

/*
    lightCycle is an object who represent a lightCycle in the Tron's Universe.
    A LightCycle is represented with his name.
    @param name: The name of the object lightCycle
    @param x: The position of the X axis
    @param y: The position of the Y axis
    @param direction: The direction of the lightCycle object
    @param color: The color of the lightCycle
 */
function LightCycle (name, x, y, direction, color) {
    this.name = name;
    this.positionXOrigins = x;
    this.positionYOrigins = y;
    this.currentX = x;
    this.currentY = y;
    this.directionOrigins = direction;
    this.currentDirection = direction;
    this.color = color;
    this.height = 8;
    this.width = 8;
    this.speed = 2;
    this.score = 0;
    this.coordinates = [];
    
    /*
     Function which be able to reset all the modified parameters of a lightCycle object
     */
    this.reset = function () {
        this.currentX = this.positionXOrigins;
        this.currentY = this.positionYOrigins;
        this.direction = this.directionOrigins;
        this.coordinates = [];
    };
    
    /*
     Function which be able to generate the coordinates of a lightCycle object
     */
    this.generateCoordinates = function () {
        return this.currentX+","+this.currentY;
    };
    
    /*
     Function which be able to get the array of coordinates from a lightCycle object
     */
    this.getCoordinates = function () {
        return this.coordinates;
    };
    
    /*
     Function which be able to push coordinates into the coordinates's array of a lightCycle object
     */
    this.pushCoordinates = function () {
        this.coordinates.push(this.generateCoordinates());
    };
    
    /*
     Function which be able to set the speed of the lightCycle
     */
    this.setSpeed = function (newSpeed) {
        this.speed = newSpeed;
    };
    
    /*
     Function which be able to increment the score of the player
     */
    this.incrementScore = function () {
        this.score += 1;
    };
    
    /*
     Function which be able to calculating new coordinates of the lightCycle object
     */
    this.calculatingCoordinates = function () {
        switch (this.direction) {
        case "left":
            this.currentX -= this.width;
            break;
        case "right":
            this.currentX += this.width;
            break;
        case "up":
            this.currentY -= this.height;
            break;
        case "down":
            this.currentY += this.height;
            break;
        }
    };
    
    /*
     Render of the lightCycle
     */
    this.render = function () {
        content.fillStyle = this.color;
        content.beginPath();
        this.renderMoveTo();
        this.renderLineTo();
        content.closePath();
        content.fill();
    };
    
    /*
     Function which place the plot (to draw) at the current position of the lightCycle
     */
    this.renderMoveTo = function () {
        content.moveTo(this.currentX - (this.width / 2), this.currentY - (this.height / 2));
    };
    
    /*
     Function which be able to draw the path of the lightCycle
     */
    this.renderLineTo = function () {
        content.lineTo(this.currentX + (this.width / 2), this.currentY - (this.height / 2));
        content.lineTo(this.currentX + (this.width / 2), this.currentY + (this.height / 2));
        content.lineTo(this.currentX - (this.width / 2), this.currentY + (this.height / 2));
    };
    
    /*
     Check if there are collisions or not
     */
    this.collision = function (player) {
        /*If there is collision, return true*/
        if (
            (this.currentX < (this.width / 2)) ||
                (this.currentY < (this.height / 2)) ||
                (this.currentX > (Grid.width - (this.width / 2))) ||
                (this.currentY > (Grid.height - (this.height / 2))) ||
                (player.getCoordinates().indexOf(this.generateCoordinates()) >= 0)
        ) {
            return true;
        }
        /*Else, return false*/
        return false;
    };
    
    this.checkNextPosition = function() {
        switch(this.direction) {
        case "left":
            var current = this.currentX;
            return (current+","+this.currentY);
            break;
        case "right":
            var current = this.currentX;
            return (current+","+this.currentY);
            break;
        case "up":
            var current = this.currentY;
            return (this.currentX+","+current);
            break;
        case "down":
            var current = this.currentY;
            return (this.currentX+","+current);
            break;
        }
    };
    
    /*ONLY ONE FUNCTION FOR THE PLAYER*/
    
    /*
     move is a function which be able to the lightCycle to move on the grid
     */
    this.move = function () {
        this.calculatingCoordinates();
        if (this.coordinates.indexOf(this.checkNextPosition()) >= 0) Grid.renew(program);
        this.pushCoordinates();
    };
    
    /*FOR THE A.I.*/
    
    /*
     predict is a function which be able to the lightCycle (AI) to move on the grid, with a simple/basic algorithm
     */
    this.predict = function (otherPlayer) {
        this.simplePredict(otherPlayer);
        this.calculatingCoordinates();
        if (this.coordinates.indexOf(this.checkNextPosition()) >= 0) Grid.renew(programmer);
        this.pushCoordinates();
    };
    
    /*
     Function which be able to see what is the current direction of the lightCycle, and execute the function associated at her
     */
    this.simplePredict = function (otherPlayer) {
        switch (this.direction) {
        case "left":
            this.predictLeft(otherPlayer);
            break;
        case "right":
            this.predictRight(otherPlayer);
            break;
        case "up":
            this.predictUp(otherPlayer);
            break;
        case "down":
            this.predictDown(otherPlayer);
            break;
        }
    };
    
    //FUNCTION OK
    this.predictLeft = function (otherPlayer) {
        var nextLeft = this.currentX - this.height;
        var nextPosition = nextLeft+","+this.currentY;
        var distanceWidth = Grid.width - nextLeft;
        distanceWidth += this.height;
        if (distanceWidth >= Grid.width || (otherPlayer.getCoordinates().indexOf(nextPosition)) >= 0 || (this.getCoordinates().indexOf(nextPosition) >= 0)) this.turnUpDown(otherPlayer);
    };
    
    this.predictRight = function (otherPlayer) {
        var nextRight = this.currentX + this.height;
        var nextPosition = nextRight+","+this.currentY;
        var distanceWidth = Grid.width - nextRight;
        distanceWidth -= this.height;
        if (distanceWidth <= 0 || (otherPlayer.getCoordinates().indexOf(nextPosition)) >= 0 || (this.getCoordinates().indexOf(nextPosition) >= 0)) this.turnUpDown(otherPlayer);
    };
    
    this.predictUp = function (otherPlayer) {
        var nextUp = this.currentY - this.height;
        var nextPosition = this.currentX+","+nextUp;
        var distanceHeight = Grid.height - nextUp;
        distanceHeight += this.height;
        if (distanceHeight >= Grid.height || (otherPlayer.getCoordinates().indexOf(nextPosition)) >= 0 || (this.getCoordinates().indexOf(nextPosition) >= 0)) this.turnLeftRight(otherPlayer);
    };
    
    this.predictDown = function (otherPlayer) {
        var nextDown = this.currentY + this.height;
        var nextPosition = this.currentX+","+nextDown;
        var distanceHeight = Grid.height - nextDown;
        distanceHeight -= this.height;
        if (distanceHeight <= 0 || (otherPlayer.getCoordinates().indexOf(nextPosition)) >= 0 || (this.getCoordinates().indexOf(nextPosition) >= 0)) this.turnLeftRight(otherPlayer);
    };
    
    this.turnUpDown = function (otherPlayer) {
        var nextUp = this.currentY - this.height;
        var nextDown = this.currentY + this.height;
        var distanceUp = Grid.height - nextUp + this.height;
        if (distanceUp < Grid.height && otherPlayer.getCoordinates().indexOf(this.currentX+","+nextUp) < 0 && this.getCoordinates().indexOf(this.currentX+","+nextUp) < 0) { 
            this.direction = "up";
            return;
        }
        var distanceDown = Grid.height + nextUp - this.height;
        if (distanceDown > 0 && otherPlayer.getCoordinates().indexOf(this.currentX+","+nextDown) < 0 && this.getCoordinates().indexOf(this.currentX+","+nextDown) < 0) {
            this.direction = "down";
            return;
        }
    };
    
    this.turnLeftRight = function (otherPlayer) {
        var nextLeft = this.currentX - this.height;
        var nextRight = this.currentX + this.height;
        var distanceLeft = Grid.width - nextLeft + this.height;
        if (distanceLeft < Grid.width && otherPlayer.getCoordinates().indexOf(nextLeft+","+this.currentY) < 0 && this.getCoordinates().indexOf(nextLeft+","+this.currentY) < 0) {
            this.direction = "left";
            return;
        }
        var distanceRight = Grid.width - nextRight + this.height;
        if (distanceRight > 0 && otherPlayer.getCoordinates().indexOf(nextRight+","+this.currentY) < 0 && this.getCoordinates().indexOf(nextRight+","+this.currentY) < 0) {
            this.direction = "right";
            return;
        }
    };
    
}

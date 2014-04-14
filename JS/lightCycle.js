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
function LightCycle(name, x, y, direction, color) {
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
    this.reset = function() {
        this.currentX = this.positionXOrigins;
        this.currentY = this.positionYOrigins;
        this.direction = this.directionOrigins;
        this.coordinates = [];
    };
    
    /*
     Function which be able to generate the coordinates of a lightCycle object
     */
    this.generateCoordinates = function() {
        return this.currentX+","+this.currentY;
    };
    
    /*
     Function which be able to get the array of coordinates from a lightCycle object
     */
    this.getCoordinates = function() {
        return this.coordinates;
    };
    
    /*
     Function which be able to push coordinates into the coordinates's array of a lightCycle object
     */
    this.pushCoordinates = function() {
        this.coordinates.push(this.generateCoordinates());
    };
    
    /*
     Function which be able to set the speed of the lightCycle
     */
    this.setSpeed = function(newSpeed) {
        this.speed = newSpeed;
    };
    
    /*
     Function which be able to increment the score of the player
     */
    this.incrementScore = function() {
        this.score += 1;
    };
    
    /*
     Function which be able to calculating new coordinates of the lightCycle object
     */
    this.calculatingCoordinates = function() {
        switch (this.direction) {
            case "left":
                this.currentX -= this.width;
                break;
            case "right":
                this.currentX += this.width;
                break;
            case "up":
                this.currentY += this.height;
                break;
            case "down":
                this.currentY -= this.height;
                break;
        }
    };
    
    /*
     Render of the lightCycle
     */
    this.render = function() {
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
    this.renderMoveTo = function() {
        content.moveTo(this.currentX - (this.width / 2), this.currentY - (this.height / 2));
    };
    
    /*
     Function which be able to draw the path of the lightCycle
     */
    this.renderLineTo = function() {
        content.lineTo(this.currentX + (this.width / 2), this.currentY - (this.height / 2));
        content.lineTo(this.currentX + (this.width / 2), this.currentY + (this.height / 2));
        content.lineTo(this.currentX - (this.width / 2), this.currentY + (this.height / 2));
    };
    
    /*
     Check if there are collisions or not
     */
    this.collision = function(player) {
        if ((this.currentX < (this.width / 2)) ||
            (this.currentY < (this.height / 2)) ||
            (this.currentX > (Grid.width - (this.width / 2))) ||
            (this.currentY > (Grid.height - (this.height / 2))) ||
            player.getCoordinates().indexOf(this.generateCoordinates()) >= 0) /*
            || this.getCoordinates().indexOf(this.generateCoordinates()) >=0)                                                                   */
            return true;
        return false;
    }
    
}

/*
 move is a function which be able to the lightCycle to move on the grid
 */
LightCycle.prototype.move = function() {
    this.calculatingCoordinates();
    this.pushCoordinates();
};

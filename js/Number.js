import {allTimeLocations} from "./Tile.js";


export default function makeNumber(num, h)
{

    const newNumber = {};
    newNumber.val = [num.charAt(0), num.charAt(1)];
    newNumber.valFull = num;
    newNumber.width = 60;
    newNumber.height = 60;
    let loc = Math.floor(Math.random() * 5);
    while(allTimeLocations[loc].isTaken){    
        loc = Math.floor(Math.random() * 5);}
    newNumber.tile = allTimeLocations[loc].tile;
    newNumber.left = allTimeLocations[loc].x;
    newNumber.right = newNumber.left+newNumber.width;
    newNumber.top = allTimeLocations[loc].y;
    allTimeLocations[loc].isTaken = true;
    newNumber.bottom = newNumber.top+newNumber.bottom;
    newNumber.gravitySpeed = 0;
    newNumber.gravity = 0.1;
    newNumber.speed = 5;
    newNumber.direction = 1;
    newNumber.color = "#FFFF00";
    newNumber.isAlive = true;
    newNumber.health = h;

    newNumber.getTime = function()
    {
        return newNumber.valFull;
    };

    newNumber.hit = function()
    {
        console.log("health: " + newNumber.health);
        newNumber.health --;
        if(newNumber.health <= 0)
            this.isAlive = false;
    }

    newNumber.draw = function(context, image)
    {
        if(this.isAlive)
        {
            context.drawImage(image,this.val[0]*30,0,30,60,this.left,this.top,30,60);
            context.drawImage(image,this.val[1]*30,0,30,60,this.left+30,this.top,30,60);
            return;
        }

    };
    newNumber.update = function(widthLimit)
    {
        if(this.direction == 1)
            {
                this.left += this.speed;
                this.right += this.speed;
            }
        if(this.direction == 0)
        {
            this.left -= this.speed;
            this.right -= this.speed;
        }
        if(this.left < 0)
        {
            this.left = 0;
            this.right = this.left + this.width;
            this.direction = 1;
        }
        if(this.right > widthLimit)
        {
            this.right = widthLimit;
            this.left = this.right - this.width;
            this.direction = 0;
        }
    }
    return newNumber;
}
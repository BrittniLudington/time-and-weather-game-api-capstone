import {allTimeLocations} from "./Tile.js";


export default function makeNumber(num, h)
{

    const newNumber = {};
    newNumber.val = num;
    newNumber.width = 60;
    newNumber.height = 60;
    let loc = Math.floor(Math.random() * 5);
    console.log(loc);
    while(allTimeLocations[loc].isTaken){    console.log(loc);
        loc = Math.floor(Math.random() * 5);}
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

    newNumber.draw = function(context)
    {
        context.fillStyle = newNumber.color;
        context.fillText(this.val,this.left,this.top);
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
import {camera} from "./Camera.js";
import {player} from "./Player.js";


export let allTimeLocations = [];

export default function Tile(number, w, h, ox, oy)
{
    const tile = {};
    tile.number = number - 6;

    tile.width = w;
    tile.height = h;
    tile.left = ox;
    tile.top = oy;
    tile.right = tile.x + tile.width;
    tile.bottom = tile.y + tile.height;

    
    /*
    if ((o1.y > o2.y) && (o1.y < o2.y + o2.h)) {
  return 'top'; // o1's top border collided with o2's bottom border}
  */
    tile.collide = function(left, right, top, bottom)
    {
        let state = {left : false, right : false, top : false, bottom : false};
        if((this.top > top) && (this.top < bottom))
            state.top = true;

        return state;

    }

    tile.tempDraw = function(context)
    {
        context.fillRect(this.left,this.top,this.width,this.height);
    }
    tile.draw = function(canvasContext, img, scrCol, scrWidth, scrHeight) // 2 30 30
    {
        if(this.number < 0)
            return; // clear tile, do not draw
        // find location of sprite
        var locY = 0;
        var tempNum = this.number;

        while(tempNum >= scrCol)
        {
            tempNum = tempNum - scrCol;
            locY++;
        }
       // this.tempDraw(canvasContext);
      //  console.log(this.left, this.top, this.width, this.height);
        // x = cameraOffsetX + x*
        canvasContext.drawImage(img,tempNum*scrWidth,locY*scrHeight,scrWidth,scrHeight,this.left,this.top,this.width,this.height);
    };
    if(tile.number == 0) // time place
    {
        let timeLoc = {x : tile.left, y : tile.top, isTaken: false, tile : tile};
        allTimeLocations.push(timeLoc);
    }


   return tile;
}
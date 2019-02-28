import Tile from "./Tile.js";
import {camera} from "./Camera.js";


export default function Layer(data, tileWidth, tileHeight)
{
    const layer = {};
    layer.name = data.name;
    layer.height = data.height;
    layer.width = data.width;
    layer.array = convertTo2dArray(data.data, layer.width, layer.height);//layer.data;
    //layer.tiles = [];//new Array(data.data.length);
    layer.tiles = new Array(layer.height);

    layer.visibility = data.visible;
        //console.log(this.tiles);

    for(var i = 0; i < layer.height; i++)
    {
        layer.tiles[i] = new Array(layer.width);
        for(var j = 0; j < layer.width; j++)
        {
            var loc = [j*tileWidth,i*tileHeight];
            layer.tiles[i][j] = Tile(layer.array[i][j],tileWidth,tileHeight,loc[0],loc[1]);
            //layer.tiles[count].draw();
        }
    }

    layer.draw = function(canvasContext, img, scrCol, scrWidth, scrHeight)
    {
       
       let camBottom = Math.floor(camera.cameraByTile.top+camera.cameraByTile.height);
       let camRight = Math.floor(camera.cameraByTile.left+camera.cameraByTile.width);

        if(camBottom > this.height)
       {
            camBottom = this.height;
       }
        if(camRight >this.width)
            camRight = this.width;
       //console.log("camRight is " + camRight);

        for(let i = Math.floor(camera.cameraByTile.top); i < camBottom; i++)
        {

            for(let j = Math.floor(camera.cameraByTile.left); j < camRight; j++)
            {
                if(typeof layer.tiles[i] == 'undefined')
                {
                    console.log(i + " layer is undefined");
                }
                layer.tiles[i][j].draw(canvasContext,img,scrCol,scrWidth,scrHeight);
            }
        }
        
    };
    layer.getTile = function(x,y)
    {
        return this.tiles[Math.floor(x)][Math.floor(y)];
    };
    layer.getStartTile = function(id)
    {
        for(let i = 0; i < this.height; i++)
        {
            for(let j = 0; j < this.width; j++)
            {
                if(this.tiles[i][j].number == id)
                    return this.tiles[i][j];
            }
        }
        return -1;
        //return this.tiles[Math.floor(x)][Math.floor(y)];
    };
   return layer;
}

function convertTo2dArray(orig, width, height)
{
    var newArray = new Array(height);//[new Array(width),new Array(height)];
    var count = 0;
    for(var i = 0; i < height; i++)
    {
        newArray[i] = new Array(width);
        for(var j = 0; j < width; j++)
        {
            //console.log(count);

            newArray[i][j] = orig[count];
            count++;
        }
    }
    return newArray;
}
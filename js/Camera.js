import { player } from "./Player.js";


var key = {};

window.addEventListener("keydown",function(e)
{
    e = e || event;
    //console.log("key is " + e.key);
    var Kkey = e.keyCode;
    key[Kkey] = true;//e.type == 'keydown';
    //console.log("key's" + Kkey + " log" + " is " + key[Kkey]);
}, true);

window.addEventListener("keyup",function(event)
{
    var Kkey = event.keyCode;
    key[Kkey] = false;
    //console.log("key's" + Kkey + " log" + " is " + key[Kkey]);
});


export const camera = 
{
    left : 0, // x and y in relation to map
    top : 0,
    right : 0,
    bottom : 0,
    width : 0,
    height : 0,
    speed : 5,
    offsetX : 0,
    offsetY : 0,
    map : [0,0],
    center : [0,0],

    startTile : [0,0],
    endTile : [0,0],

    cameraByTile : 
    {
        left : 0,
        top : 0,
        width : 0,
        height : 0
    },

    update : function(context)
    {
        this.left -= this.offsetX;
        this.right = this.left + this.width;
        this.top -= this.offsetY;
        this.bottom = this.top + this.height;
        this.cameraByTile.left = this.left/30;
        this.cameraByTile.top = this.top/30;
        this.center[0] = this.left + (this.width/2);
        this.center[1] = this.top + (this.height/2);
     //   console.log(this.center[0] + ", " + this.center[1]);
     //   console.log("left:" + this.left + ", right: " + this.right + ", top: "+ this.top + ", bottom: " + this.bottom);
        context.save();
        context.translate(this.offsetX,this.offsetY);
        context.clearRect(-this.offsetX,-this.offsetY,this.width,this.height);

       
    },

    playerToLeft : function()// if player is to left of camera center, return true
    {
        return player.center[0] < this.center[0];
    },

    playerToRight : function()// if player is to left of camera center, return true
    {
        return player.center[0] > this.center[0];
    },

    playerAbove : function()// if player is to left of camera center, return true
    {
        return player.center[1] < this.center[1];
    },

    playerBelow : function()// if player is to left of camera center, return true
    {
        return player.center[1] > this.center[1];
    },

    setDimensions : function(width, height, mapW, mapH)
    {
        this.width = width;
        this.height = height;
        this.right = this.left + width;
        this.bottom = this.top + height;
        this.map[0] = mapW;
        this.map[1] = mapH;
        // we know tiles are 30x30
        this.cameraByTile.width =  (this.width / 30)+2;
        this.cameraByTile.height = (this.height / 30)+2;
        this.center[0] = this.left + (this.width/2);
        this.center[1] = this.top + (this.height/2);
    },


    checkKeys : function()
    {
        this.offsetX = 0;
        this.offsetY = 0;
        let keyDown = false;
        if(!this.playerToRight())//key[37] && !this.playerToRight())
        {
            if(this.left >0)
            {
                this.offsetX+=this.speed;
                keyDown=true;
            }
        }
        if(!this.playerBelow())//key[38] && !this.playerBelow())
        {
            if(this.top > 0)
            {
                this.offsetY+=this.speed;
                keyDown=true;
            }
        }
        if(!this.playerToLeft())//key[39] && !this.playerToLeft())
        {
            if(this.right < this.map[0])
            {
                this.offsetX-=this.speed;
                keyDown=true;
            }
        }
        if(!this.playerAbove())//key[40] && !this.playerAbove())
        {
            if(this.bottom < this.map[1])
            {
                this.offsetY-=this.speed;
                keyDown=true;
            }
        }
        return keyDown;
    }
};

/*export default class Camera
{
    constructor(width, height)
    {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        // add in maxX and maxY later
    }

    update(map)
    {
        var startCol = Math.floor(this.x / map.tSize);
        var endCol = startCol + (this.width / map.tSize);
        var startRow = Math.floor(this.y / map.tSize);
        var endRow = startRow + (this.height / map.tSize);

        var offsetX = -this.x + startCol * map.tSize;
        var offsetY = -this.y + startRow * map.tSize;
    }
}
*/
import { player } from "./Player.js";


export const camera = 
{
    left : 0, // x and y in relation to map
    top : 0,
    right : 0,
    bottom : 0,
    width : 0,
    height : 0,
    speed : 10,
    offsetX : 0,
    offsetY : 0,
    map : [0,0],
    center : [0,0],
    leniency: 1,

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

        this.left += this.offsetX;
        if(this.left < 0)
            this.left = 0;
        this.right = this.left + this.width;
        if(this.right > this.map[0])
            this.right = this.map[0];
        this.top += this.offsetY;
        if(this.top < 0)
            this.top = 0;
        this.bottom = this.top + this.height;
        if(this.bottom > this.map[1])
            this.bottom = this.map[1];
        this.cameraByTile.left = this.left/60;
        this.cameraByTile.top = this.top/60;
        if(this.cameraByTile.top < 0)
            this.cameraByTile.top = 0;
        if(this.cameraByTile.left < 0)
            this.cameraByTile.left = 0;
        this.center[0] = this.left + (this.width/2);
        this.center[1] = this.top + (this.height/2);
     //   console.log(this.center[0] + ", " + this.center[1]);
       // console.log("left:" + this.left + ", right: " + this.right + ", top: "+ this.top + ", bottom: " + this.bottom);
        context.save();
        context.translate(-this.offsetX,-this.offsetY);
     //   context.restore();
        context.clearRect(-this.offsetX,-this.offsetY,this.width,this.height);
        

       
        // offset x and y are REVERSE of regular x and y!!!!!
        // y+ goes up, x+ goes left
       
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
        this.cameraByTile.width =  (this.width / 60)+2;
        this.cameraByTile.height = (this.height / 60)+2;
        this.center[0] = this.left + (this.width/2);
        this.center[1] = this.top + (this.height/2);
    },

    setPosition : function(x, y)
    {
        this.center[0] = x;
        this.center[1] = y;
        this.left = this.center[0]-(this.width/2);
        this.right = this.left+this.width;
        this.top = this.center[1]-(this.height/2);
        this.bottom = this.top+this.height;
    },


    checkKeys : function()
    {
        this.offsetX = 0;
        this.offsetY = 0;
        let keyDown = false;
        if(this.playerToRight())//key[37] && !this.playerToRight())
        {
            if(this.left >=0)
            {
                this.offsetX+= player.center[0] - this.center[0];
                    //this.offsetX+=player.speed;
                keyDown=true;
            }
        }
        if(this.playerBelow())//key[38] && !this.playerBelow())
        {

            if(this.top >= 0)
            {
                this.offsetY+= player.center[1] - this.center[1];
                    //this.offsetY+=player.jumpSpeed;
                keyDown=true;
            }
        }
        if(this.playerToLeft())//key[39] && !this.playerToLeft())
        {
            if(this.right <= this.map[0])
            {
                this.offsetX-= this.center[0] - player.center[0];
                    //this.offsetX-=player.speed;
                keyDown=true;
            }
        }
        if(this.playerAbove())//key[40] && !this.playerAbove())
        {
            if(this.bottom <= this.map[1])
            {
                this.offsetY-= this.center[1] - player.center[1];
                    //this.offsetY-=player.gravitySpeed;
                keyDown=true;
            }
        }
        if(this.top <= 0 && this.offsetY < 0)
            this.offsetY = 0;
        if(this.left <= 0 && this.offsetX < 0)
            this.offsetX = 0;
        if(this.right >= this.map[0] && this.offsetX > 0)
            this.offsetX = 0;
        if(this.bottom >= this.map[1] && this.offsetY > 0)
            this.offsetY = 0;

        return keyDown;
    }
};


import {camera} from "./Camera.js";
import {collision} from "./Collision.js";
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


export const player =
{

    left : 0,
    top : 0,
    bottom : 0,
    right : 0,
    width : 0,
    height : 0,
    speed : 10,
    jumpSpeed : 10,
    jumpPos : 0,
    jumpMax : 300,
    center : [0,0],
    gravity : 0.2,
    gravitySpeed : 0,
    gravityMax : 15,
    map : [],
    onGround : false,
    oldPos : [],
    colTiles : [],

    collisionTile : 
    {
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        width : 0,
        height : 0,
    },

    set : function(width, height, tW, tH,mW,mH)
    {
        this.width = width;
        this.height = height;
        this.collisionTile.height = tH;
        this.collisionTile.width = tW;
        this.map[0] = mW;
        this.map[1] = mH;
    },

    setLocation: function(x,y)
    {
        this.left = x;
        this.top = y;
        this.right = x+this.width;
        this.bottom = y+this.height;
        this.center[0] = this.left + (this.width/2);
        this.center[1] = this.top + (this.height/2);
        this.updateCollision();
    },

    updateCollision: function()
    {
        this.collisionTile.left = this.left/this.collisionTile.width;
        if(this.collisionTile.left < 0)
            this.collisionTile.left = 0;
        this.collisionTile.right = this.right/this.collisionTile.width;
        if(this.collisionTile.right > this.map[0]/this.collisionTile.width)
            this.collisionTile.right = this.map[0]/this.collisionTile.width;
        this.collisionTile.top = this.top/this.collisionTile.height;
        if(this.collisionTile.top < 0)
            this.collisionTile.top = 0;
        this.collisionTile.bottom = this.bottom/this.collisionTile.height;
        if(this.collisionTile.bottom > this.map[1]/this.collisionTile.height)
            this.collisionTile.bottom = this.map[1]/this.collisionTile.height;
        //console.log(this.collisionTile);
        /*
        this.collisionTile.left = (this.left - this.collisionTile.width)/this.collisionTile.width;
        this.collisionTile.right = (this.right + this.collisionTile.width)/this.collisionTile.width;
        this.collisionTile.top = (this.top - this.collisionTile.height)/this.collisionTile.height;
        this.collisionTile.bottom = (this.bottom + this.collisionTile.height)/this.collisionTile.height;
        */
    },


    collided : function(map)
    {
        this.onGround = false;
        this.updateCollision(); // top left
        let value = map.getTile(this.collisionTile.top,this.collisionTile.left);
        collision.collide(this,value);
            //this.collide(value, "left", "top");

        this.updateCollision(); // top right
        
        value = map.getTile(this.collisionTile.top,this.collisionTile.right);
        collision.collide(this,value);

        this.updateCollision(); // bottom left
        value = map.getTile(this.collisionTile.bottom,this.collisionTile.left);
        collision.collide(this,value);

        this.updateCollision(); // bottom right
        value = map.getTile(this.collisionTile.bottom,this.collisionTile.right);
        collision.collide(this,value);
        
     
    },
    
    checkKeys : function(leftBorder, rightBorder, topBorder, bottomBorder, map)
    {
        let numSteps = 5;
        let stepSpeed = this.speed/numSteps;
        this.oldPos = [this.left, this.top];

        if(!this.onGround)
        {
            if(this.gravitySpeed <= this.gravityMax)
                this.gravitySpeed += this.gravity;
            this.top += this.gravitySpeed;
            this.bottom += this.gravitySpeed;
        }



        //this.collided(map);
        if(key[37])
        {
            for(let i = 0; i < numSteps; i++)
            {
                //this.oldPos = [this.left,this.top];
                this.left -= stepSpeed;
                this.right -= stepSpeed;
                //this.collided(map);
            }
           // this.left -= this.speed;
           // this.right -= this.speed;
            if(this.left <= leftBorder) 
                {
                    this.left = leftBorder;
                    this.right = this.left + this.width;
                }

        }
        if(key[39])
        {
            for(let i = 0; i < numSteps; i++)
            {
                //this.oldPos = [this.left,this.top];
                this.left += stepSpeed;
                this.right += stepSpeed;
                //this.collided(map);
            }
           // this.left += this.speed;
           // this.right += this.speed;
            if(this.right >= rightBorder)
            {
                this.right = rightBorder;
                this.left = this.right - this.width;
            }

        }

        if(key[38])
        {

            for(let i = 0; i < numSteps; i++)
            {
               // this.oldPos = [this.left, this.top];
                if(this.jumpPos <= this.jumpMax)
                {
                    this.top -= stepSpeed;
                    this.bottom -= stepSpeed;
                    this.jumpPos += stepSpeed;
                }
                //this.collided(map);
            }
            //this.top -= this.jumpSpeed;
            //this.bottom -= this.jumpSpeed;
            this.onGround = false;
            if(this.top <= topBorder)
            {
                this.top = topBorder;
                this.bottom = this.top + this.height;
            }

        }

       if(key[40])
        {
            for(let i = 0; i < numSteps; i++)
            {
               // this.oldPos = [this.left, this.top];
                this.top += stepSpeed;
                this.bottom += stepSpeed;
                //this.collided(map);
            }
            //this.top += this.speed;
            //this.bottom += this.speed;
        }
        
       

        if(this.bottom >= bottomBorder)
        {
            this.bottom = bottomBorder;
            this.top = this.bottom - this.height;
            this.gravitySpeed = 0;
        }

       
        this.collided(map);
        this.center[0] = this.left + (this.width/2);
        this.center[1] = this.top + (this.height/2);

    },

    draw : function(context)
    {
        context.fillStyle = "#800080";
        /*for(let i = 0; i < this.colTiles.length;i++)
        {
            if(i == 6 || i == 4)
                this.colTiles[i].tempDraw(context);

        }
        */
        
       // context.fillRect(this.collisionTile.left*30,this.collisionTile.top*30,(this.collisionTile.right*30)-(this.collisionTile.left*30),(this.collisionTile.bottom*30)-(this.collisionTile.top*30));
        context.fillStyle = "#FF0000";
        context.fillRect(this.left,this.top,this.width,this.height);
    }
    
}
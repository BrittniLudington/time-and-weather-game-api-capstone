import {camera} from "./Camera.js";
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
    center : [0,0],
    gravity : 0.1,
    gravitySpeed : 0,
    map : [],
    onGround : false,

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

    collided : function(map, oldPos)
    {

        for(let i = this.collisionTile.left; i <= this.collisionTile.right; i++)
        {
            for(let j = this.collisionTile.top; j <= this.collisionTile.bottom; j++)
            {
                let tile = map.getTile(j,i);
                //console.log(tile);
                if(tile.number >= 0)
                {
                  let xOverlap = ((this.left < tile.left+tile.width) && (this.right > tile.left)); //|| ((this.left > tile.left&&this.left<tile.right) && (this.right > tile.right));
                   let yOverlap = ((this.top < tile.top) && this.bottom > tile.top);
                   let yUnderlap = ((this.top > tile.top && this.top < tile.top+tile.height) && this.bottom > tile.top+tile.height)
                    let xOverLeft = ((this.left < tile.left) && this.right > tile.left && this.right < tile.left+tile.width);
                   if(yOverlap)
                   {
                       //this.top = //oldPos[1];
                       this.bottom = tile.top;
                       this.top = this.bottom-this.height;
                       this.gravitySpeed = 0;
                       this.onGround = true;
                       oldPos[1] = this.top;
                   }
                   if(!yOverlap)
                    this.onGround = false;
                   if(yUnderlap)
                   {
                       this.top = tile.top+tile.height;
                       this.bottom = this.top+this.height;
                       oldPos[1] = this.top;
                   }
                 
                   this.center[0] = this.left + (this.width/2);
                   this.center[1] = this.top + (this.height/2);
                   camera.checkKeys();

                    
                }
                else
                    this.onGround = false;
            }
        }
    },
    
    checkKeys : function(leftBorder, rightBorder, topBorder, bottomBorder, map)
    {
        let numSteps = 5;
        let stepSpeed = this.speed/numSteps;
       /* if(!this.onGround)
        {
            this.gravitySpeed += this.gravity;
            this.top += this.gravitySpeed;
            this.bottom += this.gravitySpeed;
        }

*/
        this.updateCollision();
        let oldPos = [this.left, this.top];
        if(key[37])
        {
            for(let i = 0; i < numSteps; i++)
            {
                oldPos = [this.left,this.top];
                this.left -= stepSpeed;
                this.right -= stepSpeed;
              //  this.collided(map,oldPos);
                this.updateCollision();
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
                oldPos = [this.left,this.top];
                this.left += stepSpeed;
                this.right += stepSpeed;
               // this.collided(map,oldPos);
                this.updateCollision();
            }
           // this.left += this.speed;
           // this.right += this.speed;
            if(this.right >= rightBorder)
            {
                this.right = rightBorder;
                this.left = this.right - this.width;
            }

        }
        this.updateCollision();
       
       // this.collided(map, oldPos);
        oldPos = [this.left, this.top];
        if(key[38])
        {
            for(let i = 0; i < numSteps; i++)
            {
                oldPos = [this.left, this.top];
                this.top -= stepSpeed;
                this.bottom -= stepSpeed;
               // this.collided(map,oldPos);
                this.updateCollision();
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
                oldPos = [this.left, this.top];
                this.top += stepSpeed;
                this.bottom += stepSpeed;
                //this.collided(map,oldPos);
                this.updateCollision();
            }
            //this.top += this.speed;
            //this.bottom += this.speed;
        }
        this.updateCollision();
       
        //this.collided(map, oldPos);



        if(this.bottom >= bottomBorder)
        {
            this.bottom = bottomBorder;
            this.top = this.bottom - this.height;
            this.gravitySpeed = 0;
        }

       
       /* let right = this.colTiles[4].left + this.colTiles[4].width;
        if((this.colTiles[4].number > -1 && this.collides(right,"left"))) //|| this.colTiles[8].number > -1 && this.collides(right,"left"))
        {
            //console.log("left tile is a collision tile");
            this.left = right;
            this.right = this.left+this.width;
        }
        let bottom = this.colTiles[5].top + this.colTiles[5].height;
        if((this.colTiles[5].number > -1 && this.collides(bottom,"top")) || (this.colTiles[6].number > -1 && this.collides(bottom,"top")))
        {
            this.top = bottom;
            this.bottom = this.top+this.height;
        }
        let top = this.colTiles[9].top;
        if((this.colTiles[9].number > -1 && this.collides(top,"bottom")) || (this.colTiles[10].number > -1 && this.collides(top,"bottom")))
        {
            this.bottom = top;
            this.top = this.bottom-this.height;
            this.gravitySpeed = 0;
        }
        let left = this.colTiles[6].left;
        if(this.colTiles[6].number > -1 && this.collides(left,"right"))
        {
            this.right = left;
            this.left = this.right - this.width;
        }
        */
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
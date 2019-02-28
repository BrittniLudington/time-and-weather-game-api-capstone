
export const collision = 
{
    collide : function(player, tile)
    {
        switch(tile.number)
        {
            case 2 : if(this.collideLeft(player,tile.left)) return;
                    this.collideRight(player,tile.left+tile.width); break;
            case 3: if(this.collideLeft(player,tile.left)) return;
                    if(this.collideRight(player,tile.left+tile.width)) return;
                    this.collideBottom(player,tile.top+tile.height); break;
            case 4: if(this.collideRight(player,tile.left+tile.width)) return;
                    this.collideBottom(player,tile.top+tile.height); break;
            case 10: if(this.collideLeft(player,tile.left))return;
                    this.collideBottom(player,tile.top+tile.height); break;
            case 11: if(this.collideLeft(player,tile.left)) return;
                    if(this.collideRight(player,tile.left+tile.width)) return;
                    this.collideBottom(player,tile.top); break;
            case 12: if(this.collideTop(player,tile.top)) return;
                    this.collideBottom(player,tile.top+tile.height); break;
            case 13: if(this.collideRight(player,tile.left+tile.width)) return;
                    this.collideTop(player,tile.top); break;
            case 14: if(this.collideLeft(player,tile.left)) return;
                    this.collideTop(player,tile.top); break;
            case 20: this.collideRight(player,tile.left+tile.width); break;
            case 21: this.collideLeft(player,tile.left); break;
            case 22: this.collideBottom(player,tile.top+tile.height); break;
            // 14 not a collision tile
            case 23: this.collideTop(player,tile.top); break;
            case 30: if(this.collideRight(player,tile.left+tile.width)) return;
                    if( this.collideTop(player,tile.top)) return;
                    this.collideLeft(player,tile.left); break;
            case 31: if(this.collideLeft(player,tile.left)) return;
                    if(this.collideTop(player,tile.top)) return;
                    this.collideBottom(player,tile.top+tile.bottom); break;

        };
    },

    collideNum: function(player, number)
    {
        let oldBottom = player.oldPos[1]+player.height;

        if(player.bottom > number.top && oldBottom <= number.top)
        {
           if((player.left >= number.left && player.left <= number.right) || 
            (player.left <= number.left && player.right >= number.left))
            {
                player.gravitySpeed = -4;//-player.gravitySpeed+2;
                number.hit();
            }
           
        }

    },

    collideLeft : function(player, tile_left)
    {
        if(player.right > tile_left && player.oldPos[0]+player.width <= tile_left)
        {
            player.right = (tile_left - 0.01);
            player.left = player.right - player.width;
            return true;
        }
        return false;
    },

    collideRight : function(player, tile_right)
    {
    
        if(player.left <= tile_right && player.oldPos[0] >= tile_right)
        {
            player.left = tile_right;
            player.right = player.left+player.width;
            return true;
        }
        return false;
    },

    collideTop : function(player,tile_top)
    {
        let oldBottom = player.oldPos[1]+player.height;

        //console.log("player.bottom: " + player.bottom + ", oldPos: " + player.oldPos[1]+player.height);
        //console.log("tile top: " + tile_top);
        //console.log(player.oldPos[1]+player.height);

        if(player.bottom > tile_top && oldBottom <= tile_top)
        {
            player.bottom = tile_top - 0.01;
            player.top = player.bottom-player.height;
            player.onGround = true;
            player.gravitySpeed = 0;
            player.jumpPos = 0;
            return true;
        }

        return false;
    },

    collideBottom : function(player, tile_bottom)
    {
        if(player.top <= tile_bottom && player.oldPos[1]>= tile_bottom)
        {
            player.top = tile_bottom;
            player.bottom = player.top+player.height;
            return true;
        }
        return false;
    }
}
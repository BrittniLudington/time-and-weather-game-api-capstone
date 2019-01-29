export const animation = 
{
    sparkles : null,
    gravity : 0.5,
    gravitySpeed : 0,
    update : function(context,paths, width, height, callBack)
    {
        let speedY = 10;
        let speedX = 5;
    
        this.gravitySpeed += this.gravity;
        context.clearRect(0,0,width,height);
        for(let i = 0; i < paths.length; i++)
        {
            paths[i].y += this.gravitySpeed;
        }
        paths[0].x -= speedX;
        paths[0].y -= speedY;
        context.fillText(paths[0].time, paths[0].x,paths[0].y);
        paths[1].y -= speedY;
        context.fillText(paths[1].time, paths[1].x,paths[1].y);
        paths[2].x += speedX;
        paths[2].y -= speedY;
        context.fillText(paths[2].time, paths[2].x,paths[2].y);

        //console.log(paths[0].x, paths[0].y);
        if(paths[0].y > height+40 && paths[1].y > height+40 && paths[2].y > height+40)
        {
            callBack();
        }

        requestAnimationFrame(function(){
            animation.update(context,paths, width, height, callBack);
        });
    },

    intro : function(context, timeStr, width, height, callBack)
    {
        /*
            IDEA
            - Have each number fall off. Hours to left, minutes middle and seconds to right
            - Maybe use sparkles
        */
       context.clearRect(0,0,width,height);
       let paths = [];
       let timePieces = timeStr.split(":"); // 0 goes left, 1 goes middle, 2 goes right
       for(let i = 0; i < timePieces.length; i++)
       {
           context.fillText(timePieces[i], ((width/2)-70)+(i*50), height/2);
           paths.push({
               time : timePieces[i],
                x : ((width/2)-70)+(i*50),
                y : height/2
           });
       }

       this.update(context,paths, width, height, callBack);

       let num = 0;

       
       //setInterval(function(){console.log(num++);},1000);
      /* if(num < 3)
       {
           setTimeout(timer(num),1000);
           /* for(let i = 0; i < timePieces.length; i++)
            {
                context.clearRect(0,0,width,height);
            }
            */
           

       console.log(num + ", done");

    },

    
    

}

function timer(num)
{
    if(num < 3)
    {
    console.log(num);
    num++;
    timer(num);
    }
}
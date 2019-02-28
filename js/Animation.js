import {camera} from "./Camera.js";

export const animation = 
{
    sparkles : null,
    gravity : 0.5,
    gravitySpeed : 0,
    delta : 0.01,
    alpha : 0,
  

    endText : function(time)
    {
        let text = "<section role = 'win text' id='winText'><h1>You Win!</h1>";
        text += "<h2> Time taken : " + time + " seconds</section>";

        $("body").append(text);
    },

    end : function(context,width,height)
    {
        
        context.clearRect(camera.left,camera.top,camera.width,camera.height);
        if(this.alpha < 1)
            this.alpha += this.delta;
        context.globalAlpha = this.alpha;
        context.fillStyle = "#000000";
        context.fillRect(camera.left,camera.top,camera.width,camera.height);
        context.globalAlpha = 1;
        context.fillStyle = "#ffffff";
        //console.log(camera.left,(camera.height/2)-40);
        //context.fillText("You Win!", camera.left, (camera.height/2)-40);
        //context.fillText("Time taken : " + time + " seconds", camera.left, camera.height/2);
        if(this.alpha >= 1)
            return;
        requestAnimationFrame(function(){animation.end(context,width,height)});
    },

   

}

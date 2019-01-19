import {player} from "./Player.js";
import {camera} from "./Camera.js";
import {time} from "./Time.js";
import {api} from "./Data.js";
//import {importLevel, map, getMapSize} from "./Map.js";
import NewMap from "./NewMap.js";
var canvas;
var context;
var map;
let timeStr;
let night = "#09162b";
let globalAlpha = 0;

$("#backButton").click(function()
{
    window.location.href = "index.html";
})


window.onload = function ()
{

  $("#town").before("Town: ");
  $("#countriesHere").before("Country: ");
  $("#countriesHere").load("Countries.html");
    canvas = document.getElementById('canvas');

    context = canvas.getContext('2d');   
    context.font = "40px Ariel";
    time.img = new Image();
    time.img.src = "./img/numberSprites.png";
    player.img = new Image();
    player.img.src = "./img/charSprite.png";

   console.log("end of main");
}

function setUp()
{
  timeStr = api.time;
  timeStr = timeStr.slice(10);
  timeStr = timeStr.trim();
  map = NewMap("./levels/mainLevel.json", drawMap);
}

$("#submitButton").click(function(event)
{
  event.preventDefault();
  if(document.getElementById("dropDown") == null)
  {
    let location = $("#town").val();
    let country = $("#country").val();

    api.getLatLong(location,country, setUp);
    //return;
  }
  else
  {  
    let drop = document.getElementById("dropDown");
    let obj = api.dataTime[drop.options[drop.selectedIndex].value];
    api.removeElement(drop);
    api.removeElement(document.getElementById("p"));
    api.getTime(obj, setUp);
  }  
  
});


function drawMap()
{
    //console.log(context);
    api.removeElement(document.getElementById("town"));
    api.removeElement(document.getElementById("countriesHere"));
    api.removeElement(document.getElementById("selection"));
    map.drawMap(context);
    player.set(map.tilewidth-5,map.tileheight-5, map.tilewidth, map.tileheight, map.width,map.height);
    player.setLocation(map);//camera.right / 2, camera.height / 2);
    camera.setDimensions(canvas.width,canvas.height, map.width, map.height);
    //camera.setPosition(player.center[0],player.center[1]);
    time.setTime(timeStr, map.width,map.height);
    globalAlpha = time.getLight();
    requestAnimationFrame(update);
}

function update()
{
    //player.checkKeys();
    if(!time.status())
    {
      // game over
      console.log("you win!");
      return;
    }
    context.clearRect(0,0,map.width,map.height);

    time.update();
    player.checkKeys(camera.left,camera.right,camera.top,camera.bottom, map);
    let updateCam = camera.checkKeys();
    //console.log(player.left + ", " + player.top);
    if(updateCam)
        camera.update(context);//player.left + (player.width/2), player.top + (player.height/2), context);
    
    map.drawMap(context);
    context.fillStyle = time.color;
    context.fillText(timeStr,camera.left+10,camera.top+40);
    time.draw(context);
    player.draw(context);
    if(globalAlpha != 0)
    {
      context.globalAlpha = globalAlpha;
      context.fillStyle = night;
      context.fillRect(camera.left,camera.top,camera.width,camera.height);
      context.globalAlpha = 1.0;
    }
    //context.restore();
    //player.draw(context);

    //console.log("camera position: " + camera.left + ", " + camera.top);
    requestAnimationFrame(update);
}




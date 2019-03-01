import {player} from "./Player.js";
import {camera} from "./Camera.js";
import {time} from "./Time.js";
import {api} from "./Data.js";
import {timer} from "./Timer.js";
import {animation} from "./Animation.js";
//import {importLevel, map, getMapSize} from "./Map.js";
import NewMap from "./NewMap.js";
var canvas;
var context;
var map;
let timeStr;
let night = "#09162b";
let globalAlpha = 0;

function loadPage()
{

  handleButtons();
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

function handleButtons()
{
  $("#backButton").click(function()
  {
      window.location.href = "index.html";
  });

  $("#submitButton").click(function(event)
  {
    event.preventDefault();
  
      let location = $("#town").val();
      let country = $("#country").val();
      api.getLatLong(location,country, setUp);
      //return;
  });
  
  
}

function setUp()
{
  timeStr = api.time;
  timeStr = timeStr.slice(10);
  timeStr = timeStr.trim();

  resizeCanvas();
  //while(!startKey[89]){} // 89 == y
        context.clearRect(0,0,canvas.width, canvas.height);
        context.fillText("Loading...",0,(canvas.height/2));
        //animation.intro(context,timeStr,canvas.width,canvas.height, setUpPartContinued);
        context.clearRect(0,0,canvas.width, canvas.height);
        context.fillText("Loading...",0,(canvas.height/2));
        context.clearRect(0,0,canvas.width, canvas.height);
        map = NewMap("./levels/mainLevel.json", drawMap);
        time.startTimer();
        //setUpPartContinued();
  
  
}

function resizeCanvas()
{
  $("#canvasDiv").width("100%");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

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
    timer.setUp();
    requestAnimationFrame(update);
}

function update()
{
  
    //player.checkKeys();

    if(!time.status())
    {
      // game over
      console.log("you win!");
      context.fillStyle = "#000000";
      animation.endText(time.endTimer());
      requestAnimationFrame(function(){animation.end(context,canvas.width,canvas.height);});
      return;
    }

    player.checkKeys(camera.left,camera.right,camera.top,camera.bottom, map);
    let updateCam = camera.checkKeys();
    //console.log(player.left + ", " + player.top);
    if(updateCam)
        camera.update(context);//player.left + (player.width/2), player.top + (player.height/2), context);
    

    if(timer.checkFPS())
    {
      context.clearRect(0,0,map.width,map.height);

      map.drawMap(context);
      context.fillStyle = time.color;
      context.fillText(timeStr,camera.left+10,camera.top+40);
      time.draw(context);
        player.draw(context);
    }
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

loadPage();




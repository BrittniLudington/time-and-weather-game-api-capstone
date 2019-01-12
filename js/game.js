import {player} from "./Player.js";
import {camera} from "./Camera.js";
import {time} from "./Time.js";
//import {importLevel, map, getMapSize} from "./Map.js";
import NewMap from "./NewMap.js";
var canvas;
var context;
var map;
let zoneVal, timeStr;
let options;


window.onload = function ()
{

    canvas = document.getElementById('canvas');

    context = canvas.getContext('2d');   
    context.font = "40px Ariel";
    options = document.getElementById("options");
    let newObj = document.createElement("option");
    newObj.text = "loading timezones, please wait...";
    options.add(newObj);
    getTimeZones();


   console.log("end of main");
   //map.drawMap(context);
}

function updateTime(){

    let k = "9OQQVUWZ20HP";
    
    $.ajax({
      url: "https://api.timezonedb.com/v2.1/get-time-zone",
      data:
      {
        key: k,
        format:"json",
        by: "zone",
        zone: zoneVal
      },
      success: function(result)
      {
        console.log(result.formatted);
        timeStr = result.formatted;
        timeStr = timeStr.slice(10);
        timeStr = timeStr.trim();
        map = NewMap("./levels/mainLevel.json", drawMap);



      },
      error: function(err)
      {
        console.log("error");
        console.log(err);
      }
    });
    
    }

function getTimeZones()
{
  let k = "9OQQVUWZ20HP";

$.ajax({
  url: "https://api.timezonedb.com/v2.1/list-time-zone",
  data:
  {
    key: k,
    format:"json",
  },
  success: function(result)
  {
    //console.log(result);
    options.remove(0);
    console.log("getTimeZones");
    for(let i = 0; i < result.zones.length; i++)
    {
      let newObj = document.createElement("option");
      newObj.text = result.zones[i].zoneName;
      options.add(newObj);
    }
    
  },
  error: function(err)
  {
    console.log("error");
    console.log(err);
  }
});
}


$("#submitButton").click(function(event)
{
    $(this).prop("disabled",true);
  event.preventDefault();
  console.log("hello");
  zoneVal = $('#options').val();
  //$('#dropDownId :selected').text();

  updateTime();
  
  
  //interval = setInterval(update, minute); //uncomment this when testing
  //context.fillText(value,10,50);

});


function drawMap()
{
    //console.log(context);
    map.drawMap(context);
    camera.setDimensions(canvas.width,canvas.height, map.width, map.height);
    player.set(map.tilewidth-5,map.tileheight-5, map.tilewidth, map.tileheight, map.width,map.height);
    player.setLocation(camera.right / 2, camera.height / 2);
    time.setTime(timeStr, map.width,map.height);
    requestAnimationFrame(update);
}

function update()
{
    //player.checkKeys();
    context.clearRect(0,0,canvas.width,canvas.height);

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
    //context.restore();
    //player.draw(context);

    //console.log("camera position: " + camera.left + ", " + camera.top);
    requestAnimationFrame(update);
}




////"source":"..\/..\/..\/Users\/Goombablood2\/Desktop\/games\/tileTest2.tsx"
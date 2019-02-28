let data;

function getLatLong(location, country, setUp)
{
  let k = "pk.eyJ1IjoibHVkaW5ndG9uYiIsImEiOiJjanF4NXNsOWowMGE4NDhvM3dvMDZsbnBsIn0.GpjBJGrakjo1_C7Mgs9oLA";//"AIzaSyB790W6_Uy8zwf1Wg4AN5bJuELnT79jgjw";

$.ajax({
  url: "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?country="+country+"&fuzzyMatch=false"+"&types=place"+"&autocomplete=false"+"&access_token="+k,

  success: function(result)
  {

    if(document.getElementById("p") != null)
      removeElement(document.getElementById("p"));
    if(document.getElementById("dropDown") != null)
      removeElement(document.getElementById("dropDown"));
    data = result.features;
    api.dataTime = data;
    if(result.features.length == 0)
    {
      let p = document.createElement("p");
      p.appendChild(document.createTextNode("No locations of that name were found. Make sure everything is spelled correctly and the correct country code is used."));
      document.getElementById("selection").appendChild(p);
      return;
    }
    if(result.features.length > 1)
    {
      let dropDown = document.createElement("select");
      for(let i = 0; i < result.features.length; i++)
      {
        let newData = new Option(result.features[i].place_name,i);
        dropDown.appendChild(newData);
      }
      dropDown.setAttribute("id","dropDown");
      let p = document.createElement("p");
      p.appendChild(document.createTextNode("More than one location has that name. Please specify your selection in the drop down list and submit again."));

      removeElement(document.getElementById("submitButton"));
      document.getElementById("selection").appendChild(p);
      document.getElementById("selection").appendChild(dropDown);
      let newSubmit = document.createElement("button");
      let submitNode = document.createTextNode("Submit");
      newSubmit.setAttribute("id","submit2");
      newSubmit.setAttribute("type","button");
      newSubmit.appendChild(submitNode);

      document.getElementById("selection").appendChild(newSubmit);
      $('#submit2').click(function(event)
      {
          event.preventDefault();

          let drop = document.getElementById("dropDown");
          let obj = data[drop.options[drop.selectedIndex].value];
          removeElement(drop);
          removeElement(document.getElementById("p"));
          removeElement(document.getElementById("submit2"));
          getTime(obj, setUp);
  
      });

      return;
    }
    else
      getTime(data[0], setUp);

  },
  error: function(err)
  {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode("No locations of that name were found. Make sure everything is spelled correctly and the correct country code is used."));
    document.getElementById("selection").appendChild(p);
    console.log("error");
    console.log(err);
  }
});
}

function getTime(obj, setUp)
{
  let k = "9OQQVUWZ20HP";
  let latLong = obj.geometry.coordinates;
  
  $.ajax({
    url: "https://api.timezonedb.com/v2.1/get-time-zone",
    data:
    {
      key: k,
      format:"json",
      by: "position",//"zone",
      //zone: zoneVal
      lat: latLong[1],
      lng: latLong[0]
    },
    success: function(result)
    {
      console.log(result.formatted);
      api.time = result.formatted;
      setUp();
     // getWeather(obj, setUp);
      //context.fillText(result.formatted,10,50);
      
    },
    error: function(err)
    {
      console.log("error");
      console.log(err);
    }
  });
  
}


function removeElement(element)
{
  if(element != null)
    element.parentNode.removeChild(element);
}

export const api = 
{
    getLatLong : getLatLong,
    getTime : getTime,
    removeElement : removeElement,
    dataTime : data,
    time : ""
};
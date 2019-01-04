import Layer from "./Layer.js";

var state = false;

export default function NewMap(name, callback)
{
        const map = {};
        var request = new XMLHttpRequest();
        request.onload = function (e)
        {
            if(request.readyState === 4)
            {
                if(request.status === 200)
                {
                    console.log("success");
                    map.jsonFile = JSON.parse(this.responseText);
                    //console.log(map.jsonFile.tilesets[0].source);
                    map.sprSheet = new Image();
                    map.sprSheet.src = map.jsonFile.tilesets[0].source;
                    map.layers = new Array(map.jsonFile.layers.length);
                    map.srcRow = map.jsonFile.tilesets[0].row;
                    map.srcCol = map.jsonFile.tilesets[0].col;
                    map.srcWidth = map.jsonFile.tilesets[0].width;
                    map.srcHeight = map.jsonFile.tilesets[0].height;
                    map.width = map.jsonFile.layers[0].width * map.jsonFile.tilewidth;
                    map.tileheight = map.jsonFile.tileheight;
                    map.tilewidth = map.jsonFile.tilewidth;
                    map.height = map.jsonFile.layers[0].height * map.jsonFile.tileheight;
                    map.layers = [];
                    for(var i = 0; i < map.jsonFile.layers.length; i++)
                    {
                        map.layers[i] = Layer(map.jsonFile.layers[i], map.jsonFile.tilewidth, map.jsonFile.tileheight);
                    }

                    map.getTile = function(x,y)
                    {
                        /*
                            purpose: send in boundary to the collision layer. Collision layer should return the four tiles around.
                            Use for loops?
                        */
                        for(let i = 0; i < this.layers.length; i++)
                        {
                            if(this.layers[i].name == "collision")
                            {
                                return this.layers[i].getTile(x,y);
                            }
                        }

                        return -1;
                        // for this the collision layer is 1
                        
                    };

                    map.drawMap = function(context)
                    {
                        //console.log(this.layers);
                        for(var i = 0; i < this.layers.length; i++)
                        {
                            if(this.layers[i].visibility)
                                this.layers[i].draw(context, this.sprSheet,this.srcCol,this.srcWidth,this.srcHeight);
                        }
                        
                    };
                    state = true;
                    callback();
                }
            }
        }
                   

        request.open("GET", name, true);
        request.send(null);
        return map;
}


function loadLevel(name)
{
    return fetch('./levels/' + name +'.json')
    .then(r => r.json());

}

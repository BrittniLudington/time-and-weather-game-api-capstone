const map = {
    x : 0,
    y : 0,
    tSize : 0,
    level : null
};

function importLevel(name)
{
        return loadLevel(name);
}

function getTile(layer, col, row)
{
    var mapCol = map.level.layers[layer].width;
    return map.level.layers[layer][row * mapCol + col];
}

function getMapSize()
{
    const tileHeight = map.level.tileheight;
    const tileWidth = map.level.tilewidth;
    const width =   map.level.width;
    const height = map.level.height;
    map.x = tileWidth * width;
    map.y = tileHeight * height;
    map.tSize = tileHeight;
     // tileHeight and tileWidth are the same in this case

}

function loadLevel(name)
{
    return fetch('./levels/' + name +'.json')
    .then(r => r.json());

}

export {importLevel, map, getMapSize};
import makeNumber from "./Number.js";

export const time =
{
    hour : 0,
    minute : 0,
    second : 0,
    height : 0,
    width : 0,
    color : "#FFFF00",
    img : "",

    setTime : function(string, w, h)
    {
        this.width = w;
        this.height = h;
        let array = string.split(":");
        this.hour = makeNumber(array[0], 100);
        this.minute = makeNumber(array[1], 300);
        this.second = makeNumber(array[2], 500);


    },

    getLight : function()
    {
        if(this.hour.getTime() > 7 && this.hour.getTime() < 16 )
            return 0;

        return 0.7;
    },

    update : function()
    {
        //this.hour.update(this.width);
        //this.minute.update(this.width);
        //this.second.update(this.width);
    },

    draw : function(context)
    {
        this.hour.draw(context, this.img);
        this.minute.draw(context, this.img);
        this.second.draw(context, this.img);
    }

}
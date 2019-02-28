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
    start : 0,
    end : 0,

    setTime : function(string, w, h)
    {
        this.width = w;
        this.height = h;
        let array = string.split(":");
        this.hour = makeNumber(array[0], 5);
        this.minute = makeNumber(array[1], 3);
        this.second = makeNumber(array[2], 1);


    },

    startTimer : function()
    {
        this.start = new Date();
    },

    endTimer : function()
    {
        this.end = new Date() - this.start;

        return (this.end / 1000).toFixed(1);
    },

    getLight : function()
    {
        if(this.hour.getTime() > 7 && this.hour.getTime() < 16 )
            return 0;

        return 0.7;
    },

    status : function()
    {
        return this.second.isAlive || this.minute.isAlive || this.hour.isAlive;
    },

    draw : function(context)
    {
        this.hour.draw(context, this.img);
        this.minute.draw(context, this.img);
        this.second.draw(context, this.img);
    }

}
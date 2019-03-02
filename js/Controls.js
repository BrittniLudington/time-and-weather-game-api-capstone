
export const controls = 
{
    key : {},

    setKeyboard : function()
    {

        window.addEventListener("keydown",function(e)
        {
            e = e || event;
            //console.log("key is " + e.key);
            var Kkey = e.keyCode;
            controls.key[Kkey] = true;//e.type == 'keydown';
            //console.log("key's" + Kkey + " log" + " is " + key[Kkey]);
        }, true);
        
        window.addEventListener("keyup",function(event)
        {
            var Kkey = event.keyCode;
            controls.key[Kkey] = false;
            //console.log("key's" + Kkey + " log" + " is " + key[Kkey]);
        });
        
    },

};
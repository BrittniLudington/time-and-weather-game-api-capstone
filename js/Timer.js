
export const timer =
{
    oldFrameTimer : 0,
    oldMainFrame : 0,
    characterFps : 84,
    Fps : 16,

    setUp : function()
    {
        this.oldFrameTimer = Date.now();
        this.oldMainFrame = this.oldFrameTimer;
    },

    checkFrame : function()
    {
        let now = Date.now();
        let elapsed = now - this.oldFrameTimer;
        if(elapsed >= this.characterFps)
        {
            this.oldFrameTimer = now - (elapsed % this.characterFps);
            return true;
        }
        return false;
    },

    checkFPS : function()
    {
        let now = Date.now();
        let elapsed = now - this.oldMainFrame;
        if(elapsed >= this.Fps)
        {
            this.oldMainFrame = now - (elapsed % this.Fps);
            return true;
        }
        return false;
    }
}
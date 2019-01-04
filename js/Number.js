
export default function makeNumber(num, h)
{
    const newNumber = {};
    newNumber.val = num;
    newNumber.width = 30;
    newNumber.height = 30;
    newNumber.color = "#ffff00";
    newNumber.left = 0;
    newNumber.right = newNumber.left+newNumber.width;
    newNumber.top = h;
    newNumber.bottom = newNumber.top+newNumber.bottom;
    newNumber.gravitySpeed = 0;
    newNumber.gravity = 0.1;
    newNumber.speed = 5;
    newNumber.direction = 1;

    newNumber.draw = function(context)
    {
        context.fillStyle = newNumber.color;
        context.fillText(this.val,this.left,this.top);
    };
    newNumber.update = function(widthLimit)
    {
        if(this.direction == 1)
            {
                this.left += this.speed;
                this.right += this.speed;
            }
        if(this.direction == 0)
        {
            this.left -= this.speed;
            this.right -= this.speed;
        }
        if(this.left < 0)
        {
            this.left = 0;
            this.right = this.left + this.width;
            this.direction = 1;
        }
        if(this.right > widthLimit)
        {
            this.right = widthLimit;
            this.left = this.right - this.width;
            this.direction = 0;
        }
    }
    return newNumber;
}
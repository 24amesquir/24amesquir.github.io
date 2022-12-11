//heat seaking missle
class Missle{
    constructor(x, y, angle, speed, target){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.target = target;
        this.size = 5;
        this.color = "red";
        this.damage = 10;
        this.range = 1000;
        this.distance = 0;
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.restore();
    }
    update(){
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.distance += this.speed;
        if(this.distance > this.range){
            this.remove();
        }
        this.angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        this.draw();
    }
    remove(){
        for(let i = 0; i < missles.length; i++){
            if(missles[i] == this){
                missles.splice(i, 1);
            }
        }
    }
}

//make a bullet class that takes in x, y, angle, color, and size
class Bullet{
    constructor(x, y, angle, color, size){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
        this.size = size;
        this.speed = 5;
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, this.size*3, this.size);
        ctx.restore();
    }
    update(){
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.draw();
    }
}
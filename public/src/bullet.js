//heat seaking missle
class Missile{
    constructor(x, y, angle, speed, target){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
        this.target = target;
        this.size = 5;
        this.color = "red";
        this.damage = 10;
        this.range = canvas.width * 1.2;
        this.distance = 0;
        this.frame = 0;
        this.image = new Image();
        this.image.src = "assets/images/missile.png";
        alarm.play();
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle+Math.PI/2);
        ctx.drawImage(this.image, -this.image.width/globalScale*2, -this.image.height/globalScale*2, this.image.width/globalScale*4, this.image.height/globalScale*4);
        ctx.restore();
    }
    update(){
        this.frame += 1;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.distance += this.speed;
        if(this.distance > this.range){
            this.remove();
        }
        this.angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        this.draw();
        if(this.frame < 100 == 0){
            if(this.frame % 10 == 0){
                if(this.speed < 4){
                    this.speed += 0.05;
                }else{
                    this.speed = 4;
                }
            }
        }
        if(this.collision(this.target)){
            this.target.health -= this.damage;
            this.remove();
        }
    }
    remove(){
        for(let i = 0; i < bullets.length; i++){
            if(bullets[i] == this){
                bullets.splice(i, 1);
            }
        }
        for(let i = 0;i < objects.length; i++){
            if(objects[i] == this){
                objects.splice(i, 1);
            }
        }
        alarm.remove();
    }
    collision(other){
        //check if the bullet is colliding with the other object
        if(this.x + this.size > other.x && this.x < other.x + other.size){
            if(this.y + this.size > other.y && this.y < other.y + other.size){
                return true;
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
        this.damage = 5;
        this.speed = this.size * 1.2;
    }
    collision(other){
        //check if the bullet is colliding with the other object using this.size and other.width, other.height
        if(this.x + this.size > other.x && this.x < other.x + other.width){
            if(this.y + this.size > other.y && this.y < other.y + other.height){
                return true;
            }
        }

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
        if(this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0){
            this.remove();
        }
        if(this.collision(enemyShip)){
            enemyShip.health -= this.damage;
            this.remove();
            console.log("hit");
        }
    }
    remove(){
        for(let i = 0; i < bullets.length; i++){
            if(bullets[i] == this){
                bullets.splice(i, 1);
            }
        }
        for(let i = 0;i < objects.length; i++){
            if(objects[i] == this){
                objects.splice(i, 1);
            }
        }
    }

}


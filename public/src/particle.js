class Particle{
    constructor(x, y, color, size){
        this.x = x;
        this.y = y;
        this.angle = Math.random() * 2 * Math.PI;
        this.color = color;
        this.size = size;
        this.speed = Math.random()*5;
        this.life = 0;
        this.maxLife = Math.random()*200;
    }
    draw(){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    update(){
        this.life += 1;
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.draw();
        if(this.life > this.maxLife){
            this.remove();
        }
    }
    remove(){
        for(let i = 0; i < particles.length; i++){
            if(particles[i] == this){
                particles.splice(i, 1);
            }
        }
        for(let i = 0;i < objects.length; i++){
            if(objects[i] == this){
                objects.splice(i, 1);
            }
        }
    }
}
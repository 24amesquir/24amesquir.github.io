let ships = {'lightning': 'assets/images/lightning.png', '': ''}
let bullets = [];

class Ship{
    constructor(x, y, angle, color,src='lightning',isEnemey=false){
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.color = color;
        this.vel = 0;
        this.acc = 0;
        this.maxVel = 2.6;
        this.maxAcc = 0.1;
        this.friction = 0.01;
        this.turnSpeed = Math.PI/180;
        this.maxTurn = .9;
        this.health = 100;
        this.shipImage = new Image();
        this.shipImage.src = 'assets/images/'+src+'.png';
        this.goingDown = false;
        this.rotation = 0;
        this.rotateInterval = [0,0];
        this.maxRotateSpeed = 1;
        this.rotationSpeed = .02;
        this.maxBullets = 10;
        this.reloadSpeed = 600;
        this.currentBullets = 10;
        this.isEnemy = isEnemey;
    }

    draw(){/*
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle/180*Math.PI);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -10);
        ctx.lineTo(10, 10);
        ctx.lineTo(0, 5);
        ctx.lineTo(-10, 10);
        ctx.lineTo(0, -10);
        ctx.fill();
        ctx.restore();*/
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation/180*Math.PI);
        ctx.drawImage(this.shipImage, -this.shipImage.width/globalScale, -this.shipImage.height/globalScale, this.shipImage.width/globalScale*2, this.shipImage.height/globalScale*2);
        ctx.restore();
    }

    update(){
        this.vel += this.acc;
        this.vel *= 1 - this.friction;
        if(this.vel > this.maxVel) this.vel = this.maxVel;
        if(this.vel < -this.maxVel) this.vel = -this.maxVel;
        this.x += Math.cos(this.angle) * this.vel;
        this.y += Math.sin(this.angle) * this.vel;
        if(this.x > canvas.width) this.x = 0;
        if(this.x < 0) this.x = canvas.width;
        if(this.y > canvas.height) this.y = 0;
        if(this.y < 0) this.y = canvas.height;
        if(this.health < 20){
            playSong('Tanc_a_lelek.mp3')
        }
        if(this.isEnemy == false){
            this.move();
        }
        this.applyGravity();
        this.applyFriction();
        //every 60 frames, reload a bullet
        frameCount++;
        if(frameCount % this.reloadSpeed == 0){
            this.reloadBullets();
        }
    }

    accelerate(amount = this.maxAcc/10){
        this.acc += amount;
        if(this.acc > this.maxAcc) this.acc = this.maxAcc;
    }

    decelerate(amount = this.maxAcc){
        this.acc -= amount;
        if(this.acc < -this.maxAcc) this.acc = -this.maxAcc;
    }

    degreesToRadians(degrees){
        return degrees * Math.PI / 180;
    }

    shoot(){
        //x, y, angle, color, size)
        if(this.currentBullets > 0){
            bullets.push(new Bullet(this.x-3, this.y-10, this.degreesToRadians(this.rotation)-Math.PI/2, 'red', 5));
            this.currentBullets -= 1;
        }
    }

    reloadBullets(){
        if(bullets.length < this.maxBullets){
            this.currentBullets += 1;
        }else{
            this.currentBullets = this.maxBullets;
        }
    }

    move(){
        if(keys['w']) this.goUp();
        if(keys['s']) this.goDown();
        if(keys['a']) this.goLeft();
        if(keys['d']) this.goRight();
        if(keys['q']) this.rotateLeft();
        if(keys['e']) this.rotateRight();
    }

    goUp(){
        this.accelerate();
    }

    goDown(){
        this.decelerate();
        this.goingDown = true;
    }

    goLeft(){
        this.turnLeft();
    }

    goRight(){
        this.turnRight();
    }

    turnLeft(){
        if(this.angle - (-Math.PI*this.maxTurn)/2 > -Math.PI*this.maxTurn){
            if(this.angle > -Math.PI*this.maxTurn){
                this.angle -= this.turnSpeed*2;
                if(!this.goingDown){
                    this.accelerate();
                }else{
                    this.decelerate();
                }
            }
        }
        else{
            if(this.angle > -Math.PI*this.maxTurn){
                this.angle -= this.turnSpeed;
                if(!this.goingDown){
                    this.accelerate();
                }else{
                    this.decelerate();
                }
            }
        }
    }

    turnRight(){
        if(this.angle - (-Math.PI*this.maxTurn)/2 < -Math.PI*this.maxTurn){
            if(this.angle < 0+1-this.maxTurn){
                this.angle += this.turnSpeed*2;
                if(!this.goingDown){
                    this.accelerate();
                }else{
                    this.decelerate();
                }
            }
        }
        else{
            //this line is broken
            if(this.angle < 0){
                this.angle += this.turnSpeed;
                if(!this.goingDown){
                    this.accelerate();
                }else{
                    this.decelerate();
                }
            }
        }
    }

    rotateLeft(amount=.1){
        amount = this.rotateInterval[0];
        this.rotation -= amount;
        if(this.rotateInterval[0] < this.maxRotateSpeed){
            this.rotateInterval[0] += .01;
        }else{
            this.rotateInterval[0] = this.maxRotateSpeed;
        }
    }

    rotateRight(amount=.1){
        amount = this.rotateInterval[1];
        this.rotation += amount;
        if(this.rotateInterval[1] < this.maxRotateSpeed){
            this.rotateInterval[1] += .01;
        }else{
            this.rotateInterval[1] = this.maxRotateSpeed;
        }
    }

    applyGravity(){
        this.y += gravity;
    }

    applyFriction(){
        if(this.vel > 0){
            this.vel -= this.friction;
        }else if(this.vel < 0){
            this.vel += this.friction;
        }
        /*if(!keys['w'] && !keys['s'] && !keys['a'] && !keys['d']){ 
            this.acc = .01;
        }*/
        if(this.acc > 0){
            this.acc -= this.friction/10;
        }else if(this.acc < 0+gravity/10){
            this.acc += this.friction/10;
        }
        if(this.rotation > 60){
            this.rotation -= this.friction*8;
        }else if(this.rotation < -60){
            this.rotation += this.friction*8;
        }
        if(this.rotateInterval[0] > 0 && keys['q'] == false){
            this.rotateInterval[0] -= .01;
        }else if(this.rotateInterval[0] < 0){
            this.rotateInterval[0] = 0;
        }
        if(this.rotateInterval[1] > 0 && keys['e'] == false){
            this.rotateInterval[1] -= .01;
        }else if(this.rotateInterval[1] < 0){
            this.rotateInterval[1] = 0;
        }

    }




}
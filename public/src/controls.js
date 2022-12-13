//wasd to control the ship, mouse to shoot, space to launch missles
let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    e: false,
    q: false,
    space: false
};

document.addEventListener('keydown', function(event){
    if(event.key == 'w'){
        keys.w = true;
    }
    if(event.key == 'a'){
        keys.a = true;
    }
    if(event.key == 's'){
        keys.s = true;
    }
    if(event.key == 'd'){
        keys.d = true;
    }
    if(event.key == 'e'){
        keys.e = true;
    }
    if(event.key == 'q'){
        keys.q = true;
    }
    if(event.key == ' '){
        keys.space = true;
    }
});

document.addEventListener('keyup', function(event){
    if(event.key == 'w'){
        keys.w = false;
    }
    if(event.key == 'a'){
        keys.a = false;
    }
    if(event.key == 's'){
        keys.s = false;
    }
    if(event.key == 'd'){
        keys.d = false;
    }
    if(event.key == 'e'){
        keys.e = false;
    }
    if(event.key == 'q'){
        keys.q = false;
    }
    if(event.key == ' '){
        ship.shootMissile();
        keys.space = false;
    }
});

function mouseRelativeToTheShip(event){
    return {
        x: event.clientX - ship.x,
        y: event.clientY - ship.y
    };
}

let mouseX = 0;
let mouseY = 0;
let mouseAngle = 0;
document.addEventListener('mousemove', function(event){
    mouseAngle = Math.atan2(mouseRelativeToTheShip(event).y, mouseRelativeToTheShip(event).x);
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseOver(enemyShip);
});

function mouseOver(other){
    //if the mouse is within 50 px of the other object draw a box around it
    if(mouseX > other.x - 50 && mouseX < other.x + other.size + 50){
        if(mouseY > other.y - 50 && mouseY < other.y + other.size + 50){
            //draw a box around the object
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeRect(other.x - 50, other.y - 50, other.size + 100, other.size + 100);
        }
    }
}

let mouseDown = false;
let mouseInterval;
document.addEventListener('mousedown', function(){
    mouseDown = true;
    if(mouseInterval) clearInterval(mouseInterval);
    mouseInterval = setInterval(function(){
        ship.shoot(mouseAngle);
    }, 100);
});

document.addEventListener('mouseup', function(){
    clearInterval(mouseInterval);
    mouseDown = false;
});

//if screen loses focuse mouseDown is set to false
document.addEventListener('blur', function(){
    clearInterval(mouseInterval);
    mouseDown = false;
});
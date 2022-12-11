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
        keys.space = false;
        ship.shoot();
    }
});

function mouseRelativeToTheShip(event){
    return {
        x: event.clientX - ship.x,
        y: event.clientY - ship.y
    };
}

let mouseAngle = 0;
document.addEventListener('mousemove', function(event){
    mouseAngle = Math.atan2(mouseRelativeToTheShip(event).y, mouseRelativeToTheShip(event).x);
});
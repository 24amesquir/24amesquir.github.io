// get the canvas element and its context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//set canvas background to black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

//global variables
const gravity = 1;
const globalScale = 5;//1/scale = globalScale
let frameCount = 0;

//create ship
let enemyShip = new Ship(canvas.width / 2, canvas.height / 2, -Math.PI/2, 'red', 'gladiator', true);
let ship = new Ship(canvas.width / 2, canvas.height / 2, -Math.PI/2, 'white');

//update function
function update(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ship.update();
    ship.draw();
    enemyShip.update();
    enemyShip.draw();
    for(let i = 0; i < bullets.length; i++){
        bullets[i].update();
    }
    requestAnimationFrame(update);
}

//if the user interacts with the page, play the song which is stored in the variable music using music.play(), and then remove the event listener
document.addEventListener('click', function(){
    music.play();
    document.removeEventListener('click', arguments.callee);
});

document.addEventListener('DOMContentLoaded', update);
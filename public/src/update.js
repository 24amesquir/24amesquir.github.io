//update function
function update(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < objects.length; i++){
        objects[i].update();
    }
    UI();
    frameCount++;
    requestAnimationFrame(update);
}

//if the user interacts with the page, play the song which is stored in the variable music using music.play(), and then remove the event listener
document.addEventListener('click', function(){
    music.play();
    document.removeEventListener('click', arguments.callee);
});

document.addEventListener('DOMContentLoaded', update);


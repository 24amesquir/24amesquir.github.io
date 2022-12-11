let songPath = 'assets/sound/music/'; // path to the song folder
let songIndex = 0; // index of the song that is currently playing

let songTitles = [
    'Africa_II.mp3',
    'Arabesco.mp3',
    'Big_Bouzouk.wav',
    'Bois.wav',
    'Bruma.mp3',
    'Dle_yaman.mp3',
    'Dronish_descent.mp3',
    'Duduk_4_ever.wav',
    'Enkan.mp3',
    'Flor.mp3',
    'Folyo_merfold.mp3',
    'Le_vent_est_tombe.wav',
    'May_I_have.wav',
    'Mellifluous.wav',
    'Mogott_short.wav',
    'Movimento_1.mp3',
    'Onirya.mp3',
    'Sahara_test.wav',
    'Tanc_a_lelek.mp3',//this one is epic
    'Track66.mp3',
    'Yeshoua.wav'
];

let deaultVolume = 1; // default volume of the song

class Song{
    constructor(title, src, volume=1, duration=1, startingIndex=0){
        this.title = title;
        if(deaultVolume != 1){
            this.volume = deaultVolume;
        }else{
            this.volume = volume;
        }
        this.duration = duration;
        this.isPlaying = false;
        this.src = src;
        this.startingIndex = startingIndex;
        this.audio = new Audio(src);
    }
    play(){
        this.isPlaying = true;
        this.fadeIn(5);
    }
    stop(){
        this.fadeOut(.9);
    }
    setVolume(volume){
        this.volume = volume;
        this.audio.volume = volume;
    }
    fadeIn(duration){
        this.duration = duration;
        this.audio.volume = 0;
        this.audio.play();
        let inInterval = setInterval(() => {
            try{
                this.audio.volume += 1 / (duration * 1000);
            }catch(e){
                clearInterval(inInterval);
                this.audio.volume = 1;
            }
            if(this.audio.volume >= this.volume || this.audio.volume >= 1){
                clearInterval(inInterval);
            }
        }, 1);
    }
    fadeOut(duration){
        this.duration = duration;
        let outInterval = setInterval(() => {
            try{
                this.audio.volume -= 1 / (duration * 1000);
            }catch(e){
                clearInterval(outInterval);
                this.audio.volume = 0;
            }
            if(this.audio.volume <= 0.1){
                clearInterval(outInterval);
                this.audio.pause();
                this.audio.currentTime = this.startingIndex;
                this.isPlaying = false;
            }
        }, 1);
    }
}

let songs = [];
for(let i = 0; i < songTitles.length; i++){
    songs.push(new Song(songTitles[i], songPath + songTitles[i]));
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playSong(songName){
    music = songs.find(song => song.title == songName);
    if(music){
        music.play();
    }
}

function displayAllSongs(){
    for(let i = 0; i < songs.length; i++){
        console.log(songs[i].title);
    }
}

let music = songs[randomInt(0, songs.length - 1)];

// if the key m is pressed, toggle the music
document.addEventListener('keydown', function(event){
    if(event.key == 'm'){
        if(music.isPlaying){
            music.stop();
        }else{
            music.play();
        }
    }
    //if user types a greater than sign, skip to the next song
    if(event.key == '>'){
        music.stop();
        songIndex++;
        if(songIndex >= songs.length){
            songIndex = 0;
        }
        // wait for the song to fade out
        let newInterval = setInterval(() => {
            if(music.isPlaying == false){
                music = songs[songIndex];
                music.play()
                clearInterval(newInterval);
            }
        }, 100);
    }
    //if user types a less than sign, skip to the previous song
    if(event.key == '<'){
        music.stop();
        songIndex--;
        if(songIndex < 0){
            songIndex = songs.length - 1;
        }
        music = songs[songIndex];
        music.play()
    }
    if(event.key == ','){
        if(music.volume > 0.1){
            music.setVolume(music.volume - 0.1);
            deaultVolume = music.volume;
        }
    }
    if(event.key == '.'){
        if(music.volume < 1){
            music.setVolume(music.volume + 0.1);
            deaultVolume = music.volume;
        }
    }
});
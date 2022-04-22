const wrapper = document.querySelector("main");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const audio = document.querySelector("audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("h2");
const cover = document.querySelector("img");


const songs = ["Declan - Infinity", "icykof - Painkillers",  "Zeta - NICE", "Himitsu - Lost Within"];

let songIndex = 0;


loadSong(songs[songIndex]);


function loadSong(song) {
    title.innerText = song;
    audio.src = `./songs/${song}.mp3`;
    cover.src = `./img/${song}.jpg`;
}



function playSong() {
    wrapper.classList.add("play");
    play.querySelector("span.fa-solid").classList.remove("fa-circle-play");
    play.querySelector("span.fa-solid").classList.add("fa-pause");


    audio.play();
}

function pauseSong() {
    wrapper.classList.remove("play");
    play.querySelector("span.fa-solid").classList.add("fa-circle-play");
    play.querySelector("span.fa-solid").classList.remove("fa-pause");


    audio.pause();
}


function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

  
    loadSong (songs[songIndex]);

    playSong();
}



function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

  
    loadSong (songs[songIndex]);

    playSong();
}

function updateProgress(e) {
    const { currentTime, duration } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`; 
}

function setProgress(e) {

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;

}


play.addEventListener("click", (isPlaying) => {
    isPlaying = wrapper.classList.contains("play");

    if (!isPlaying) {
        playSong();
    } else {
        pauseSong();
    }

});


prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSong);



audio.addEventListener("timeupdate", updateProgress);


progressContainer.addEventListener("click", setProgress);


audio.addEventListener("ended", nextSong);






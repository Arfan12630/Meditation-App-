const app = () => {
  //Display song, player, outline, video, and sounds
  const song = document.getElementsByClassName("meditation_music");
  const play = document.getElementById("play_button");
  const outline = document.getElementById("Moving_circle");
  const video = document.querySelector(".background_video");
  const sound = document.querySelectorAll(".sound_selection");
  const timeDisplay = document.getElementsByClassName("time_displayer");
  const timeSelect = document.querySelectorAll("time_select button");

  //length of outline
  console.log(outline);
  const outlineLength = outline.getTotalLength();

  //Set Duration
  let beginningDuration = 600;

  //Use Stroke dash array and stroke dash offset to animate properties
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick different sounds

  sound.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      pauseorPlay(song);
    });
  });

  //Select sound

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      beginningDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(
        beginningDuration / 60
      )}: ${Math.floor(beginningDuration % 60)}`;
    });
  });
  //Function for pausing and playing sound

  const pauseorPlay = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "pause 2.png";
    } else {
      song.pause();
      video.pause();
      pause.src = "./jpeg/playbutton2.png";
    }
  };

  //playing the sound
  window.onload = function () {
    play.addEventListener("click", () => {
      pauseorPlay(song);
    });
  };

  //Animating the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = beginningDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progress =
    outlineLength - (currentTime / beginningDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    //Animating text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= beginningDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/playbutton2.png";
      video.pause();
    }
  };
};

window.onload = function () {
  app();
};

/*get elements*/
const player = document.querySelector(".video-container");
const video = player.querySelector("video");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress-filled");
const toggle = player.querySelector(".toggle");
const skips = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player-slider");
const fullscreen = player.querySelector(".fullscreen-button");

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
function updateButton() {
  if (!video.paused) {
    toggle.innerHTML = "❚❚";
  } else {
    toggle.innerHTML = "▶";
  }
}
function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

let mouseDown = false;

function handleRangeUpdate() {
  if (mouseDown) {
    if (this.name === "volume") {
      video.volume = this.value;
    } else {
      video.playbackRate = this.value;
    }
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function handleTimeChange(e) {
  const timeDecimal = e.offsetX / progress.offsetWidth;
  video.currentTime = video.duration * timeDecimal;
}
function toggleFullscreen() {
  video.requestFullscreen();
}

toggle.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

progress.addEventListener("click", handleTimeChange);
progress.addEventListener("mousemove", (e) => {
  if (mouseDown) handleTimeChange(e);
});
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

skips.forEach((button) => button.addEventListener("click", skip));

sliders.forEach((slider) => {
  slider.addEventListener("mousemove", handleRangeUpdate);
  slider.addEventListener("mousedown", () => (mouseDown = true));
  slider.addEventListener("mouseup", () => (mouseDown = false));
});

fullscreen.addEventListener("click", toggleFullscreen);

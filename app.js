const notes = [
  "c",
  "cis",
  "d",
  "dis",
  "e",
  "f",
  "fis",
  "g",
  "gis",
  "a",
  "ais",
  "h"
];

const keysDIV = document.querySelectorAll(".key");
const recordTriggerBTN = document.getElementById("recordTrigger");

let recordedSong = [];
let lastTimeStamp = 0;
let recordStatus = false;

// register event listener for divs
keysDIV.forEach(el =>
  el.addEventListener("click", () => linkToAudio(el.dataset.note))
);
// register event listener for keyboard
window.addEventListener("keypress", e => {
  // get note from key
  const note =
    e.key === e.key.toUpperCase() ? e.key.toLowerCase() + "is" : e.key;
  linkToAudio(note);
});

recordTriggerBTN.addEventListener("click", function() {
  recordStatus = !recordStatus;
  // clear song
  if(!recordStatus) recordedSong = []
  this.textContent = recordStatus ? "STOP" : "RECORD";
  lastTimeStamp = new Date().getTime();
});

function linkToAudio(note) {
  if (notes.includes(note)) {
    // toggle class to html key
    const key = [...keysDIV].find(key => key.dataset.note === note);
    key.classList.add("active")
    // if song is record, add it to song
    if(recordStatus) record(note)
    // create audio element and play it
    const audioElement = document.createElement("audio");
    audioElement.src = `./notes/${note}.mp3`;
    // add element to hook
    document.body.appendChild(audioElement);
    audioElement.play();
    // delete element after playing
    audioElement.addEventListener("ended", function() {
      key.classList.remove("active")
      this.remove();
    });
  } else {
    console.error(`[link to audio] selected note does not exist.`);
  }
}

function record(note) {
  const newTimestamp = new Date().getTime()
  const timestamp = newTimestamp - lastTimeStamp
  lastTimeStamp = newTimestamp
  recordedSong.push({
    note,
    timestamp
  })
}

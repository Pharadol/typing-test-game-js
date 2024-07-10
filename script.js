const wordEl = document.getElementById("word");
const textEl = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

const btnLevelEl = document.getElementById("level-btn");
const settingsEl = document.getElementById("settings");
const levelFormEl = document.getElementById("level-form");
const levelEl = document.getElementById("level");
const gameoverEl = document.getElementById("gameover-container");

const article = `Prehistory The Day the Mesozoic Died by Sean Carroll How the story of the dinosaurs' demise was uncovered The Day the Dinosaurs Died by Douglas Preston young paleontologist may have discovered record the most significant event in the history of life on Earth Neanderthals Were People, Too by Jon Mooallem New research shows they shared many behaviors that we long believed to be uniquely human. Why did science get them so wrong Sleeping with the Enemy by Elizabeth Kolbert`;

const words = article.split(" ");

let randomText;
let score = 0;
let time = 10; // easy : 15 , medium : 10 , hard : 5
let saveMode =
  localStorage.getItem("mode") !== null
    ? localStorage.getItem("mode")
    : "medium"; // ดึงค่าที่เคยบันทึกมาเก็บ ถ้ามีดึงค่ามา ถ้าไม่มีประกาศ medium
levelEl.value = saveMode;

let level = "medium";

const timeInterval = setInterval(updateTime, 1000); // setInterval : call some f every x seconds

function getRandomWord() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);
  return randomWord;
}

function displayWordToUI() {
  randomText = getRandomWord();
  wordEl.innerHTML = randomText;
}
textEl.addEventListener("input", (e) => {
  const inputText = e.target.value;
  if (inputText == randomText) {
    if (saveMode == "easy") {
      time+=3;
    } else if (saveMode == "medium") {
      time+=2;
    } else {
      time+=1;
    }
    displayWordToUI();
    updateScore();
    e.target.value = "";
  } else {
    console.log("false");
  }
});

function updateScore() {
  score += 10;
  scoreEl.innerHTML = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time;
  if (time === 0) {
    clearInterval(timeInterval); //stop setInterval
    gameOver();
  }
}

function gameOver() {
  gameoverEl.innerHTML = `<h1>TIME OUT!!</h1>
    <p>Your Scores : ${score} points</p>
    <button onclick="location.reload()">Play Again</button>`;
  gameoverEl.style.display = "flex";
}

btnLevelEl.addEventListener("click", () => {
  settingsEl.classList.toggle("hide");
});

levelEl.addEventListener("change", (e) => {
  level = e.target.value;
  localStorage.setItem("mode", level); // localStorage(key,value) : ค่าที่ฝังใน browser ไม่่หายไป check from application
});

function startGame() {
  if (saveMode == "easy") {
    time = 15;
  } else if (saveMode == "medium") {
    time = 10;
  } else {
    time = 5;
  }
  displayWordToUI();
}

startGame();
textEl.focus(); //auto focus input area

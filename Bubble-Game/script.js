"use strict";

let hitVal = 0;
let score = 0;

function hitNum() {
  hitVal = Math.floor(Math.random() * 10);
  document.querySelector(".hit").textContent = hitVal;
}

function setScore() {
  score += 10;
  document.querySelector(".score").textContent = score;
}

function timerNum() {
  let timerVal = 30;
  setInterval(() => {
    if (timerVal > 0) {
      timerVal--;
      document.querySelector(".timer").textContent = timerVal;
    } else {
      clearInterval;
      document.querySelector(
        ".bottom"
      ).innerHTML = `<h1>Game Over! </br> Yous Score is ${score} !</h1>`;
    }
  }, 1000);
}

function makeBubble() {
  let panel = "";

  for (let i = 1; i <= 152; i++) {
    let num = Math.floor(Math.random() * 10);
    panel = panel + `<div class="bbl">${num}</div>`;
  }

  document.querySelector(".bottom").innerHTML = panel;
}

document.querySelector(".bottom").addEventListener("click", (details) => {
  let numHit = Number(details.target.textContent);
  if (numHit == hitVal) {
    setScore();
    hitNum();
    makeBubble();
  }
});

function start() {
  hitNum();
  timerNum();
  makeBubble();
}

start();
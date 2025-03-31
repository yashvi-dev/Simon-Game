let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "blue", "green"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = `Level ${level + 1}`;
    setTimeout(levelUp, 500);
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => btn.classList.remove("userFlash"), 250);
}

function levelUp() {
  userSeq = []; // Reset user sequence for new level
  level++;
  h2.innerText = `Level ${level}`;

  let randomIndex = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIndex];
  gameSeq.push(randomColor); // Keep adding to the sequence

  playSequence(); // Show the entire sequence again
}

function playSequence() {
  let i = 0;
  function flashNext() {
    if (i < gameSeq.length) {
      let btn = document.querySelector(`.${gameSeq[i]}`);
      btnFlash(btn);
      i++;
      setTimeout(flashNext, 600); // Delay between flashes
    }
  }
  flashNext();
}

function checkAns(idx) {
  if (userSeq[idx] !== gameSeq[idx]) {
    h2.innerText = `Game Over! Press any key to restart.`;
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 500);
    resetGame();
    return;
  }

  if (userSeq.length === gameSeq.length) {
    setTimeout(levelUp, 1000); // Move to next level when full sequence is correct
  }
}

function resetGame() {
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => btn.addEventListener("click", btnPress));

"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 15;
const BUG_COUNT = 15;
const GAME_DURATION_SEC = 20;

const gameBtn = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

// 게임의 시작 유무를 판단할 변수
let started = false;
// 최종 점수를 기록할 변수
let score = 0;
// 게임 시작 전에는 타이머가 undefined 상태
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug") {
    // 벌레
    finishGame(false);
  }
}

// 이벤트 위임을 이용해서 벌레와 당근 이벤트 주기
// field.addEventListener('click', (event)=> {
//   onFieldClick(event);
// });
// 위의 함수에서 event를 생략하면 다음과 같다.
// field.addEventListener("click", onFieldClick);

gameBtn.addEventListener("click", () => {
  // 게임이 시작되었다면 게임을 중지해야 함(버튼)
  if (started) {
    stopGame();
    // 게임이 중지되었다면 게임을 시작해야 함(버튼)
  } else {
    startGame();
  }
});

finish;
function startGame() {
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}

function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText("REPLAY?");
  // showPopUpWithText("REPLAY?");
  sound.playAlert();
  sound.stopBackground();
}

function finishGame(win) {
  started = false;
  hideGameButton();
  if (win) {
    sound.playWin();
  } else {
    sound.playBug();
  }
  stopGameTimer();
  stopSound(bgSound);
  gameFinishBanner.showWithText(win ? "YOU WIN 🎉" : "YOU LOST 😥");
  // showPopUpWithText(win ? "YOU WIN 🎉" : "YOU LOST 😥");
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fa-solid");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  // 남은 시간 체킹
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function stopGameTimer() {
  clearInterval(timer);
}

function initGame() {
  score = 0;
  gameScore.innerHTML = CARROT_COUNT;
  gameField.init();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}

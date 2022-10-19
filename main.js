'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

// 게임의 시작 유무를 판단할 변수
let started = false;
// 최종 점수를 기록할 변수
let score = 0;
// 게임 시작 전에는 타이머가 undefined 상태
let timer = undefined;

gameBtn.addEventListener('click', () => {
  // 게임이 시작되었다면 게임을 중지해야 함(버튼)
  if (started) {
    stopGame();
  // 게임이 중지되었다면 게임을 시작해야 함(버튼)
  } else {
    startGame();
  }
  // !을 이용해서 현재 상태를 부정할 수 있다.
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function stopGame() {

}

function initGame() {
  field.innerHTML = '';
  gameScore.innerHTML = CARROT_COUNT;
  // 벌레와 당근을 생성한 다음 field에 추가
  addItem('carrot', CARROT_COUNT, 'img/carrot.png');
  addItem('bug', BUG_COUNT, 'img/bug.png');
}


function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.append(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


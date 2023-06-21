"use strict";

import PopUp from "./popup.js";
import * as sound from "./sound.js";
import GameBuilder, { Reason } from "./game.js";

const gameFinishBanner = new PopUp();

const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay❓";
      sound.playAlert();
      break;
    case Reason.win:
      message = "YOU WON 🎉";
      sound.playWin();
      break;
    case Reason.lose:
      message = "YOU LOST 💩";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }

  gameFinishBanner.showWithText(message);
});

// 이벤트 위임을 이용해서 벌레와 당근 이벤트 주기
// field.addEventListener('click', (event)=> {
//   onFieldClick(event);
// });
// 위의 함수에서 event를 생략하면 다음과 같다.
// field.addEventListener("click", onFieldClick);

gameFinishBanner.setClickListener(() => {
  game.start();
});

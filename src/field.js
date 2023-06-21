"use strict";

import * as sound from "./sound.js";

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export default class Field {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    // 이렇게 해서 this바인딩을 해도 된다.
    // Bug를 클릭하면 함수가 실행되지 않음. (this 바인딩 문제)
    // 자바스크립트는 함수를 다른 인자로 전달할 때 클래스 정보는 함께 전달되지 않는다.
    // 그래서 함수를 변수화시키는 것이 좋다.
    // this.field.addEventListener("click", (event) => this.onClick(event));
    this.field.addEventListener("click", this.onClick);
  }

  init() {
    this.field.innerHTML = "";
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  // '_'을 붙이면 클래스 내부에서만 사용한다는 의미
  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.append(item);
    }
  }

  // this는 어떤 클래스 안에 있는 함수를 콜백으로 전달할 때 함수가 포함되어져있는 클래스의 정보가 사라진다.
  // 그래서 화살표 함수를 사용해서 변수화시키는 것이 좋다.
  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      // 당근
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(ItemType.bug);
    }
  };
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

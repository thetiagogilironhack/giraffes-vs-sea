class Enemy {
  constructor(
    gameContentScreen,
    strength,
    height,
    width,
    speed,
    spawn,
    left,
    top,
    img,
    isMoving,
    mathType
  ) {
    this.gameContentScreen = gameContentScreen;
    this.strength = strength;
    this.height = height;
    this.width = width;
    this.speed = speed;
    this.spawn = spawn * 1000;
    this.left = left;
    this.top = top - this.height / 2;
    this.isMoving = isMoving;
    this.mathType = mathType;

    this.element = document.createElement("img");
    // this.element.src = img;
    this.element.style.backgroundColor = img; // need to delete when add img and unhide the img element above
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameContentScreen.appendChild(this.element);
  }

  spawnTime() {}

  move() {
    if (this.isMoving) {
      this.updatePosition();
      this.element.style.left = `${this.left}px`;
    }
  }

  updatePosition() {
    this.left -= this.speed;
  }
}

class Enemy {
  constructor(
    gameContentScreen,
    strength,
    speed,
    spawn,
    height,
    width,
    left,
    top,
    img
  ) {
    this.gameContentScreen = gameContentScreen;
    this.strength = strength;
    this.hasDamagedPlayer = false;
    this.speed = speed * 1000;
    this.spawn = spawn * 1000;
    this.height = height;
    this.width = width;
    this.left = left;
    this.top = top - this.height / 2;
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

  spawnTime() {
  }

  speedTime() {
    // NOT CREATED
  }

  updatePosition() {
    this.left -= this.speed;
  }

  move() {
    this.updatePosition();
    this.element.style.left = `${this.left}px`;
  }
}
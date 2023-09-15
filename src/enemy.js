class Enemy {
  constructor(
    gameContentScreen,
    strength,
    speed,
    spawn,
    left,
    top,
    height,
    width,
    img
  ) {
    this.gameContentScreen = gameContentScreen;
    this.strength = strength;
    this.speed = speed;
    this.spawn = spawn;
    this.top = top;
    this.left = left;
    this.height = height;
    this.width = width;
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

  spawn() {
    // NOT CREATED
  }

  speedTime() {
    // NOT CREATED
    const duration = this.speed;
  }

  updatePosition() {
    this.left -= this.speed;
  }

  move() {
    this.updatePosition();
    this.element.style.left = `${this.left}px`;
  }
}

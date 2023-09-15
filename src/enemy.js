class Enemy {
  constructor(
    gameScreen,
    strength,
    speed,
    spawn,
    left,
    top,
    height,
    width,
    img
  ) {
    this.gameScreen = gameScreen;
    this.strength = strength;
    this.speed = speed;
    this.spawn = spawn;
    this.top = top;
    this.left = left;
    this.height = height;
    this.width = width;

    this.element = document.createElement("img");
    this.element.src = img;
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  spawn() {

  }

  speedTime (){
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
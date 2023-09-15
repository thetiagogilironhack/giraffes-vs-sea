class Player {
  constructor(gameContentScreen, height, width, left, top) {
    this.gameContentScreen = gameContentScreen;
    this.health = 100;
    this.height = height;
    this.width = width;
    this.left = left - this.width / 2;
    this.top = top - this.height / 2;
    this.element = document.createElement("player");

    // this.element.src = '../images/car.png'
    this.element.style.backgroundColor = "red"; // need to delete when add img and unhide the img element above

    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameContentScreen.appendChild(this.element);
  }

  receiveDmg() {
    this.health = this.health - Enemy.strength;
  }
}

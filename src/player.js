class Player {
  constructor(gameContentScreen, left, top, height, width) {
    this.gameContentScreen = gameContentScreen;
    this.left = left;
    this.top = top;
    this.height = height;
    this.width = width;
    this.element = document.createElement('player')

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
    this.health = this.health - enemy.strength;
  }
}
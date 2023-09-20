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
    this.valueX = 0;
    this.valueY = 0;
    this.operation;
    this.correctAnswer = this.mathGenerator();
  }

  spawnTime() {}

  move() {
    if (this.isMoving) {
      setTimeout(() => this.updatePosition(), this.spawn);
      this.element.style.left = `${this.left}px`;
    }
  }

  updatePosition() {
    this.left -= this.speed;
  }

  // MATH GENERATOR - GENERATE RANDOM NUMBERS AND ASIGN THEM TO THE ENEMY CLASSES
  mathGenerator() {
    switch (this.mathType) {
      case "dolphin":
        this.valueX = Math.floor(Math.random() * 10);
        this.valueY = Math.floor(Math.random() * 10);
        this.operation = "+";
        this.enemyRemove();
        break;
      case "shark":
        this.valueX = Math.floor(Math.random() * 100);
        this.valueY = Math.floor(Math.random() * 10);
        this.operation = "+";
        this.enemyRemove();
        break;
      case "whale":
        this.valueX = Math.floor(Math.random() * 100);
        this.valueY = Math.floor(Math.random() * 100);
        this.operation = "+";
        this.enemyRemove();
        break;
      case "kraken":
        this.valueX = Math.floor(Math.random() * 1000);
        this.valueY = Math.floor(Math.random() * 100);
        this.operation = "+";
        this.enemyRemove();
        break;
      default:
        this.valueX = 0;
        this.valueY = 0;
        this.operation = "+";
        break;
    }

    return eval(`${this.valueX} + ${this.valueY}`);
  }

  createUserAnswerInput() {
    const userAnswer = document.querySelector("#user-answer");
    console.log(userAnswer.value);
  }

  enemyRemove() {
    const userAnswer = this.createUserAnswerInput();
    for (let i = 0; i < Game.enemies.length; i += 1) {
      const enemy = this.enemies[i];
      if (userAnswer === this.correctAnswer) {
        enemy.remove();
        Game.enemies.splice(i, 1);
      }
    }
  }
}

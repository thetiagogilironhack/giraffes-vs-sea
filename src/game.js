class Game {
  constructor() {
    this.startScreen = document.getElementById("game-start");
    this.gameContentScreen = document.getElementById("game-content");
    this.gameLoseScreen = document.getElementById("game-lose");
    this.gameWinScreen = document.getElementById("game-win");
    this.height = 600;
    this.width = 1000;
    this.animateId = 0;
    this.gameOver = false;
    this.enemyStartPosition = this.width - 200;
    this.player = new Player(this.gameContentScreen, 50, 80, 100, 300);
    this.dolphin = new Enemy(
      this.gameContentScreen,
      20,
      20,
      40,
      0.7, // should be 0.7
      2,
      this.enemyStartPosition,
      150,
      "blue",
      true,
      "dolphin"
    );
    this.shark = undefined;
    this.whale = undefined;
    this.kraken = undefined;
    this.enemies = [this.dolphin];
  }

  // START THE GAME - CHANGES THE DISPLAY OF THE SCREENS
  start() {
    this.startScreen.style.display = "none";
    this.gameLoseScreen.style.display = "none";
    this.gameWinScreen.style.display = "none";
    this.gameContentScreen.style.display = "block";

    this.gameContentScreen.style.height = `${this.height}px`;
    this.gameContentScreen.style.width = `${this.width}px`;

    this.gameLoop();
  }

  // MATH DISPLAY - DISPLAY THE MATH PROBLEM ON THE SCREEN
  createUserAnswerInput() {
    let userAnswer = document.querySelector("#user-answer");
    console.log(userAnswer.value);
  }

  // UPDATE or GAMEPLAY - HERE THE ENEMIES START MOVING IN A DEFINED ORDER AND GET ELIMINATED
  update() {
    this.createUserAnswerInput();

    for (let i = 0; i < this.enemies.length; i += 1) {
      const enemy = this.enemies[i];
      enemy.move();

      if (enemy.left <= 200 && !enemy.hasDamagedPlayer) {
        this.player.health -= enemy.strength;
        enemy.hasDamagedPlayer = true;
        enemy.element.remove();
        this.enemies.splice(i, 1);
        i -= 1;
        console.log(this.player.health);
        console.log(this.enemies);
      }
    }

    // SPAWN SHARK
    if (!this.sharkSpawned && this.dolphin.left <= this.width / 2) {
      this.shark = new Enemy(
        this.gameContentScreen,
        30,
        30,
        60,
        0.45,
        3,
        this.enemyStartPosition,
        300,
        "yellow",
        true,
        "shark"
      );
      console.log(this.shark);
      this.enemies.push(this.shark);
      this.sharkSpawned = true;
      console.log("Shark spawned");
    }

    // SPAWN WHALE
    if (!this.whaleSpawned && this.shark && this.shark.left <= this.width / 2) {
      this.whale = new Enemy(
        this.gameContentScreen,
        45,
        50,
        100,
        0.3,
        5,
        this.enemyStartPosition,
        450,
        "orange",
        true,
        "whale"
      );
      this.enemies.push(this.whale);
      this.whaleSpawned = true;
      console.log("Whale spawned");
    }

    // SPAWN KRAKEN
    if (!this.krakenSpawned && this.enemies.length === 0) {
      this.kraken = new Enemy(
        this.gameContentScreen,
        100,
        150,
        300,
        0.1, // should be 0.1
        2,
        this.enemyStartPosition - 150,
        300,
        "gray",
        true,
        "kraken"
      );
      this.enemies.push(this.kraken);
      this.krakenSpawned = true;
      console.log("Kraken spawned");
    }
  }

  // GAME LOOP - SO THE GAME CAN FINISH AND RESTART
  gameLoop() {
    this.update();

    document.getElementById("hp").innerText = this.player.health;

    if (this.player.health <= 0) {
      this.gameOver = true;
    }

    if (this.gameOver) {
      this.gameContentScreen.style.display = "none";
      this.gameLoseScreen.style.display = "block";
    } else {
      this.animateId = requestAnimationFrame(() => this.gameLoop());
    }
  }
}

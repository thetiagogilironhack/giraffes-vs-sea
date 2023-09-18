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
    this.player = new Player(this.gameContentScreen, 50, 80, 100, 300);
    this.dolphin = new Enemy(
      this.gameContentScreen,
      20,
      20,
      40,
      1,
      1,
      800,
      150,
      "blue"
    );
    this.shark = new Enemy(
      this.gameContentScreen,
      30,
      30,
      60,
      1,
      2,
      800,
      300,
      "yellow"
    );
    this.whale = new Enemy(
      this.gameContentScreen,
      45,
      50,
      100,
      1,
      3,
      800,
      450,
      "orange"
    );
    /* this.kraken = new Enemy(
      this.gameContentScreen,
      20,
      5,
      2,
      150,
      300,
      500 + 300 / 2,
      300,
      "gray"
    );*/
    this.enemies = [this.dolphin, this.shark, this.whale /* this.whale */];
  }

  start() {
    this.startScreen.style.display = "none";
    this.gameLoseScreen.style.display = "none";
    this.gameWinScreen.style.display = "none";
    this.gameContentScreen.style.display = "block";

    this.gameContentScreen.style.height = `${this.height}px`;
    this.gameContentScreen.style.width = `${this.width}px`;

    this.gameLoop();
  }

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

  update() {
    for (let i = 0; i < this.enemies.length; i += 1) {
      const enemyMove = this.enemies[i];
      enemyMove.move();

      if (this.enemies[i].left <= 200 && !this.enemies[i].hasDamagedPlayer) {
        this.player.health -= this.enemies[i].strength;
        this.enemies[i].hasDamagedPlayer = true;
        this.enemies[i].element.remove();
        console.log(this.player.health);
      }
    }
  }
}

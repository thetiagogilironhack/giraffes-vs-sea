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
      1,
      this.enemyStartPosition,
      150,
      "blue",
      true
    );

    this.shark = new Enemy(
      this.gameContentScreen,
      30,
      30,
      60,
      0.45, // should be 0.45
      3,
      this.enemyStartPosition,
      300,
      "yellow",
      false
    );

    this.whale = new Enemy(
      this.gameContentScreen,
      50,
      50,
      100,
      0.3, // should be 0.3
      5,
      this.enemyStartPosition,
      450,
      "orange",
      false
    );

    this.enemies = [this.dolphin, this.shark, this.whale];
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
      this.enemies[i].move();

      if (this.enemies[i].left <= this.width / 2) {
        if (i + 1 < this.enemies.length) {
          this.enemies[i + 1].isMoving = true;
        }
      }

      if (this.enemies[i].left <= 200 && !this.enemies[i].hasDamagedPlayer) {
        this.player.health -= this.enemies[i].strength;
        this.enemies[i].hasDamagedPlayer = true;
        this.enemies[i].element.remove();
        this.enemies.splice(i, 1);
        i -= 1;
        console.log(this.player.health);
        console.log(this.enemies);
      }
    }

    if (this.enemies.length === 0) {
      this.enemies.push(
        new Enemy(
          this.gameContentScreen,
          100,
          150,
          300,
          0.1, // should be 0.1
          2,
          this.enemyStartPosition - 150,
          300,
          "gray",
          true
        )
      );
    }
  }
}

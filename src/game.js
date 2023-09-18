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
      1,
      2,
      20,
      40,
      800 + 40 / 2,
      150,
      "blue"
    );
    this.shark = new Enemy(
      this.gameContentScreen,
      20,
      1,
      2,
      30,
      60, // everytime you change this parameter
      800 + 60 / 2, // you also need to change this parameter
      300,
      "yellow"
    );
    this.whale = new Enemy(
      this.gameContentScreen,
      20,
      1,
      2,
      50,
      100,
      800 + 100 / 2,
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

    /*if (this.player.health <= 0) {
      this.gameOver = true;
    }*/

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
    }

    for (const enemy of this.enemies) {
      if (enemy.left <= 200) {
        this.player.health -= enemy.strength;
        if (enemy.left <= 200) {
          enemy.element.remove();
        }
        console.log(this.player.health);
      }
    }
  }
}

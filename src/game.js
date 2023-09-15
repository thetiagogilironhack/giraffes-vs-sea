class Game {
  constructor() {
    this.startScreen = document.getElementById("game-start");
    this.gameContentScreen = document.getElementById("game-content");
    this.gameLoseScreen = document.getElementById("game-lose");
    this.gameWinScreen = document.getElementById("game-win");
    this.height = 600;
    this.width = 1000;
    this.player = new Player(this.gameContentScreen, 50, 80, 100, 300);
    this.dolphin = new Enemy(
      this.gameContentScreen,
      20,
      5,
      2,
      20,
      40,
      800,
      150,
      "blue"
    );
    this.shark = new Enemy(
      this.gameContentScreen,
      20,
      5,
      2,
      30,
      60,
      800,
      300,
      "yellow"
    );
    this.whale = new Enemy(
      this.gameContentScreen,
      20,
      5,
      2,
      50,
      100,
      800,
      450,
      "orange"
    );
    this.kraken = new Enemy(
      this.gameContentScreen,
      20,
      5,
      2,
      150,
      300,
      500,
      300,
      "gray"
    );
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
    this.dolphin.move();
    this.shark.move();
    this.whale.move();
    requestAnimationFrame(() => this.gameLoop());
  }
}

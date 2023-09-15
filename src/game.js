class Game {
  constructor() {
    this.startScreen = document.getElementById("game-start");
    this.gameContentScreen = document.getElementById("game-content");
    this.gameLoseScreen = document.getElementById("game-lose");
    this.gameWinScreen = document.getElementById("game-win");
  }

  start() {
    this.startScreen.style.display = 'none'
    this.gameLoseScreen.style.display = 'none'
    this.gameWinScreen.style.display = 'none'
    this.gameContentScreen.style.display = 'block'
  }
}

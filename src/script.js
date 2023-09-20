window.addEventListener("load", () => {
  const startButton = document.getElementById("start-button");
  const restartLoseButton = document.getElementById("restart-lose-button");
  const restartWinButton = document.getElementById("restart-win-button");
  let game;
  
  function startGame() {
    console.log("Start Game");
    game = new Game();
    game.start();
  }

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartLoseButton.addEventListener("click", function () {
    location.reload();
  });

  restartWinButton.addEventListener("click", function () {
    location.reload();
  });
});

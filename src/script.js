window.addEventListener("load", () => {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;
  
  function startGame() {
    console.log("Start Game");
    game = new Game();
    game.start();
  }

  startButton.addEventListener("click", function () {
    startGame();
  });

  restartButton.addEventListener("click", function () {
    location.reload();
  });
});

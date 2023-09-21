window.addEventListener("load", () => {
  const instructionsButton = document.getElementById("instructions");
  const startButton = document.getElementById("start-button");
  const restartLoseButton = document.getElementById("restart-lose-button");
  const restartWinButton = document.getElementById("restart-win-button");
  const userInput = document.getElementById("user-answer");
  let game;

  instructions.ButtonaddEventListener("click", function () {
    startGame();
  });

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

  // THIS DOESN'T ACTUALLY DO WHAT I FIRST INTENDED IT TO DO BUT I LEFT IT BECAUSE IT LOOKS SATISFYING IN-GAME TO PRESS ENTER
  userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const userAnswer = parseFloat(userInput.value);
      if (!isNaN(userAnswer)) {
      }
      userInput.value = "";
    }
  });
});

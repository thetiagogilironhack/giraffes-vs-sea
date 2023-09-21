class Game {
  constructor() {
    this.startScreen = document.getElementById("game-start");
    this.gameContentScreen = document.getElementById("game-content");
    this.gameLoseScreen = document.getElementById("game-lose");
    this.gameWinScreen = document.getElementById("game-win");
    this.height = 600;
    this.width = 1000;
    this.animateId = 0;
    this.gameWin = false;
    this.gameLose = false;
    this.enemyStartPosition = this.width - 200;
    this.player = new Player(this.gameContentScreen, 200, 350, 30, 410);
    this.dolphin = new Enemy(
      this.gameContentScreen,
      30,
      60,
      180,
      1 / 1.5, // should be 1.5
      2,
      this.enemyStartPosition,
      450,
      "./img/dolphin-move-1.png",
      true,
      "dolphin"
    );
    this.shark = undefined;
    this.whale = undefined;
    this.kraken = undefined;
    this.dolphinRemoved = false;
    this.sharkRemoved = false;
    this.krakenRemoved = false;
    this.enemies = [this.dolphin];
  }

  // START THE GAME - CHANGES THE DISPLAY OF THE SCREENS
  start() {
    this.startScreen.style.display = "none";
    this.gameContentScreen.style.display = "block";

    this.gameContentScreen.style.height = `${this.height}px`;
    this.gameContentScreen.style.width = `${this.width}px`;

    this.showEnemyMathProblem("dolphin");

    console.log("Dolphin spawned");
    console.log("Correct Answer:", this.dolphin.correctAnswer);

    this.gameLoop();
  }

  // USER ANSWER DISPLAY - DISPLAY THE USER PROBLEM ON THE SCREEN
  createUserAnswerInput() {
    const userAnswer = document.getElementById("user-answer");
    console.log(userAnswer.value);
    return parseFloat(userAnswer.value);
  }

  // MATH DISPLAY - DISPLAY THE MATH PROBLEM ON THE SCREEN
  showEnemyMathProblem(enemyType) {
    const enemy = this[enemyType];
    const capitalLetterEnemyType =
      enemyType.charAt(0).toUpperCase() + enemyType.slice(1);
    let getProblemElement = document.getElementById(`${enemyType}-problem`);
    let mathProblem = `${capitalLetterEnemyType}: ${enemy.xValue} + ${enemy.yValue}`;
    getProblemElement.textContent = mathProblem;
  }

  // REMOVE MATH DISPLAY - REMOVE THE MATH PROBLEM OF THE SCREEN
  removeEnemyMathProblem(enemyType) {
    const getProblemElement = document.getElementById(`${enemyType}-problem`);
    getProblemElement.remove();
    const userAnswer = document.getElementById("user-answer");
    userAnswer.value = "";
  }

  // UPDATE or GAMEPLAY - HERE THE ENEMIES START MOVING IN A DEFINED ORDER AND GET ELIMINATED
  update() {
    const userAnswer = this.createUserAnswerInput();

    for (let i = 0; i < this.enemies.length; i += 1) {
      const enemy = this.enemies[i];
      enemy.move();

      if (userAnswer === enemy.correctAnswer) {
        enemy.element.remove();

        this.enemies.splice(i, 1);
        switch (enemy.mathType) {
          case "dolphin":
            this.dolphinRemoved = true;
            this.removeEnemyMathProblem("dolphin");
            break;
          case "shark":
            this.sharkRemoved = true;
            this.removeEnemyMathProblem("shark");
            break;
          case "whale":
            this.whaleRemoved = true;
            this.removeEnemyMathProblem("whale");
            break;
          case "kraken":
            this.krakenRemoved = true;
            break;
          default:
            break;
        }
      } else if (enemy.left <= 200 && !enemy.hasDamagedPlayer) {
        this.player.health -= enemy.strength;
        enemy.hasDamagedPlayer = true;
        enemy.element.remove();

        switch (enemy.mathType) {
          case "dolphin":
            this.dolphinRemoved = true;
            this.removeEnemyMathProblem("dolphin");
            break;
          case "shark":
            this.sharkRemoved = true;
            this.removeEnemyMathProblem("shark");
            break;
          case "whale":
            this.whaleRemoved = true;
            this.removeEnemyMathProblem("whale");
            break;
          case "kraken":
            this.krakenRemoved = true;
            break;
          default:
            break;
        }

        this.enemies.splice(i, 1);
        i -= 1;
        console.log(this.player.health);
      }
    }

    // SPAWN SHARK
    if (
      !this.sharkSpawned &&
      (this.dolphinRemoved || this.dolphin.left <= this.width / 2)
    ) {
      this.shark = new Enemy(
        this.gameContentScreen,
        40,
        60,
        180,
        1 / 2, // should be 2
        1,
        this.enemyStartPosition,
        420,
        "./img/shark-move-1.png",
        true,
        "shark"
      );
      this.enemies.push(this.shark);
      this.sharkSpawned = true;
      this.showEnemyMathProblem("shark");
      console.log("Shark spawned");
      console.log("Correct Answer:", this.shark.correctAnswer);
    }

    // SPAWN WHALE
    if (
      !this.whaleSpawned &&
      this.shark &&
      (this.sharkRemoved || this.shark.left <= this.width / 2)
    ) {
      this.whale = new Enemy(
        this.gameContentScreen,
        60,
        80,
        230,
        1 / 3, // should be 3
        1,
        this.enemyStartPosition,
        450,
        "./img/whale-move-1.png",
        true,
        "whale"
      );
      this.enemies.push(this.whale);
      this.whaleSpawned = true;
      this.showEnemyMathProblem("whale");
      console.log("Whale spawned");
      console.log("Correct Answer:", this.whale.correctAnswer);
    }

    // SPAWN KRAKEN
    if (this.enemies.length === 0) {
      this.kraken = new Enemy(
        this.gameContentScreen,
        100,
        150,
        300,
        1 / 10, // should be 10
        2,
        this.enemyStartPosition - 150,
        400,
        "./img/kraken-move-1.png",
        true,
        "kraken"
      );
      this.enemies.push(this.kraken);
      this.showEnemyMathProblem("kraken");
      console.log("Kraken spawned");
      console.log("Correct Answer:", this.kraken.correctAnswer);
    }
  }

  // GAME LOOP - SO THE GAME CAN FINISH AND RESTART
  gameLoop() {
    this.update();

    document.getElementById("hp").innerText = this.player.health;

    if (this.kraken && this.krakenRemoved) {
      this.gameWin = true;
    }

    if (this.player.health <= 0) {
      this.gameLose = true;
    }

    if (this.gameWin) {
      this.gameContentScreen.style.display = "none";
      this.gameWinScreen.style.display = "block";
    } else if (this.gameLose) {
      this.gameContentScreen.style.display = "none";
      this.gameLoseScreen.style.display = "block";
    } else {
      this.animateId = requestAnimationFrame(() => this.gameLoop());
    }
  }
}

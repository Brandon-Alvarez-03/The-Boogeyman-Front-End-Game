// NEXT STEPS:

// dont forget to un-comment if conditions in the animate section
// change you survived from timer code block to if gameOver == true after the gameOver clearRect from canvas

//we want javascript to wait until game is fully loaded

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  //ctx = contect --> instance of built-in canvas 2d that holds drawing methods and properties needed for animation
  const ctx = canvas.getContext("2d");
  let containerWidth = document.querySelector(".game-window").offsetWidth;
  let containerHeight = document.querySelector(".game-window").offsetHeight;
  let obstacles = [];
  let time;
  let timerStart = false;
  let gameOver = false;
  let gameLost = false;

  let gameWindow = document.querySelector(".game-window");
  const gameAudio = new Audio("music/scary-chase-music.mp3");
  const gameAudio2 = new Audio("music/chase-music-option-2.mp3");
  let musicArr = [gameAudio, gameAudio2];
  let randomTrack = musicArr[Math.floor(Math.random() * musicArr.length)];
  console.log(containerWidth, containerHeight);
  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // input handler class (applies event listeners to keyboard and holds array of all currently active keys)
  class InputHandler {
    constructor() {
      //this.keys will handle control events, keys are added and removed from this array as pressed and released
      this.keys = [];
      // event listener in constructor so when instance of class is created/executed, this allows event listeners to be auto applied
      window.addEventListener(
        "keydown",
        (e) => {
          if (
            e.key === "ArrowRight" ||
            e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowUp"
          ) {
            musicArr[0].play();
            timerStart = true;
            time = 110;
            setTimeout(showControls, 1600);
            setTimeout(hideControls, 8000);
          }
        },
        {once: true}
      );
      window.addEventListener("keydown", (e) => {
        if (e.key === "m" || e.key === "M") {
          musicArr[0].pause();
        } else if (e.key === "p" || e.key === "P") {
          musicArr[0].play();
        }
      });
      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight" ||
            e.key === "ArrowUp") &&
          this.keys.indexOf(e.key) === -1
        ) {
          this.keys.push(e.key);
        }
        // console.log(e.key, this.keys);
      });
      //when we release a key, if the key is arrowdown find index of that key in this.keys and remove from the end of the array
      //in short when pressed added when released remove
      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowUp"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        // console.log(e.key, this.keys);
      });
    }
  }

  // meyers class

  class MichaelMeyers {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 265;
      this.height = 280;
      //can move player by adjusting x and y coords
      this.x = 0 - this.width * 1.15;
      //the game height minus the players height starts it right on the ground
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("meyersImg");
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 11;
      this.fps = 7;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 1;
      this.speedIncrement = 0.147; //change back to 0.14
    }

    draw(context) {
      // context.fillStyle = "white";
      // context.fillRect(this.x, this.y, this.width, this.height);
      context.drawImage(
        this.image,
        this.frameX * this.width + 5,
        this.frameY * this.height,
        this.width,
        this.height - 17,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(deltaTime, obstacles) {
      // collision detection
      // obstacles.forEach((obstacle) => {
      const dx = laurie.x + laurie.width / 2 - (this.x + this.width / 2);

      const dy = laurie.y - this.y;
      const dist = Math.sqrt(dx ** 2 + dy ** 2); //pythagorean theorem
      const collideDist = this.width / 4 - 5;
      //   console.log(dist);
      if (laurie.x <= this.x + -1) {
        laurie.x = this.x + 4; // if player position moves onto neg x-axis set player position back to zero (left game boundary)
      }
      if (dist < collideDist) {
        gameLost = true;
        gameOver = true;
      }
      // });

      // sprite animation
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) {
          this.frameX = 0;
        } else {
          this.frameX++;
          this.frameTimer = 0;
        }
      } else {
        this.frameTimer += deltaTime;
      }

      // Michael's movement
      if (timerStart) {
        this.x += this.speed * this.speedIncrement;
        if (this.x > this.gameWidth - this.width) {
          this.x = this.gameWidth - this.width;
          this.x = 0 - this.width * 1.4; // if player position moves out of game window set player position back to right game boundary
        }
      }
    }
  }

  // player class (reacts to keys and reacts by draws in and update players)
  class LaurieStrode {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 220;
      this.height = 220;
      //can move player by adjusting x and y coords
      this.x = 0;
      //the game height minus the players height starts it right on the ground
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImg");
      this.frameX = 0;
      this.frameY = 0;
      this.maxFrame = 5;
      this.fps = 13;
      this.frameTimer = 0;
      this.frameInterval = 1000 / this.fps;
      this.speed = 0;
      this.vy = 0;
      this.gravity = 1.23;
    }
    //this canvas method allows us to draw the context that we pass in to the canvas
    draw(context) {
      context.drawImage(
        // laurie width around left/right: 72 bottom/top; 34 when running left/right: 54
        this.image,
        this.frameX * this.width + 5,
        this.frameY * this.height,
        this.width,
        this.height - 20,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    // this allows us to update the state of movement by placing in an animation loop and requesting animation frames
    update(input, deltaTime, obstacles) {
      // collision detection

      obstacles.forEach((obstacle) => {
        const dx = obstacle.x - this.x;

        const dy = obstacle.y - this.y;
        const dist = Math.sqrt(dx ** 2 + dy ** 2); //pythagorean theorem
        // console.log(dist);
        if (dist < obstacle.width / 2 + 100) {
          //160 px
          this.x -= 120;
        }
      });

      // sprite animation
      if (timerStart) {
        if (this.frameTimer > this.frameInterval) {
          if (this.frameX >= this.maxFrame) {
            this.frameX = 1;
          } else {
            this.frameX++;
            this.frameTimer = 0;
          }
        } else {
          this.frameTimer += deltaTime;
        }
      }
      // controls

      if (input.keys.indexOf("ArrowRight") > -1) {
        this.speed = 5; // while "arrowright" move 5
      } else if (input.keys.indexOf("ArrowLeft") > -1) {
        this.speed = -5; // while "arrowleft" move 5 in negative
      } else if (input.keys.indexOf("ArrowUp") > -1 && this.onGround()) {
        // if player up and player on ground then register the jump this prevent double and triple jump and rpevents key hold to stay flying
        this.vy -= 18; // this is from the top of the screen essentially hence the negative
      } else {
        this.speed = 0; // if no key is pressed dont move anything
      }

      // this section will deal horizontal movement
      this.x += this.speed; // player position incremented by "speed"
      if (this.x < -5) {
        this.x = this.x + 1; // if player position moves onto neg x-axis set player position back to zero (left game boundary)
      } else if (this.x > this.gameWidth - this.width) {
        this.x = this.gameWidth - this.width; // if player position moves out of game window set player position back to right game boundary
      }

      // this section will deal with vertical movement
      this.y += this.vy; // at all times we want loc equal to vertical movement

      // here we inject the onGround method which will return a boolean so the controls can recognize if we are in the air or not
      if (!this.onGround()) {
        this.vy += this.gravity; //basically as player move updates, this "gravity" is just a counter move to the negative jump displacement so while not on ground we add basically add gravity to the antigravity created above
      } else {
        this.vy = 0; //basically stay on ground aka stopping vertical movement when on ground and wait for arrowup key log
      }
      if (this.y > this.gameHeight - this.height) {
        this.y = this.gameHeight - this.height; // prevents Laurie from falling through floor slightly after a jump lol
      }
    }

    // utility method that checks if player is on the ground or not
    // returns true or false based on whether or not Laurie is on the ground
    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  //background class  (endliss scrolling background)
  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameHeight = gameHeight;
      this.gameWidth = gameWidth;
      this.image = document.getElementById("backgroundImg");
      this.x = 0;
      this.y = -126;
      this.width = containerWidth;
      this.height = containerHeight + 190;
      // scroll of background image makes it appear player is moving forward
      this.speed = 8;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      // draw translated image to tthe right to give appearance of seamless scrolling of backdrop
      context.drawImage(
        this.image,
        this.x + this.width - 1, // minus scroll speed helps create a slight overlap in img so no gap is vis
        this.y,
        this.width,
        this.height
      );
    }
    update() {
      //this updates the background to scroll to the left
      if (timerStart) {
        this.x -= this.speed;
        if (this.x < 0 - this.width) {
          this.x = 0;
        } // once background scrolls off-screen, set back to zero position
      }
    }
  }

  // obstacle generation class

  class Obstacle {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 100;
      this.height = 100;
      this.image = document.getElementById("obstacleImg");
      this.x = this.gameWidth; //hides just outside of game window
      this.y = this.gameHeight - this.height; // prevents from going out of bounds vertically
      this.speed = Math.floor(Math.random() * (14 - 9) + 9); // rate at which obstacles approach Laurie // could possibly have difficulty where its random and another whhere it's constant
      this.toDelete = false;
    }
    draw(context) {
      // context.strokeStyle = "clear";
      // context.strokeRect(this.x, this.y + 12, this.width, this.height - 35);
      context.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        this.x,
        this.y - 18,
        this.width,
        this.height
      );
    }
    update() {
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.toDelete = true;
      }
    }
  }

  // function for adding, animating and removing obstacles (periodically adds new ones)
  function handleObstacles(deltaTime) {
    if (timerStart) {
      if (obsTimer > obsInterval + randomSpawnInterval) {
        // increasing a timer and when that timer is greater than the minimum set interval plus a random time extender, spawn an enemy and reset the clock
        // obstacle class instantiation and pushing into array only goes once, otherwise it will live in animation and push 60 obs per min
        obstacles.push(new Obstacle(canvas.width, canvas.height));
        obsTimer = 0;
      } else {
        obsTimer += deltaTime;
      }
    }
    // for each obstacle that exists in array, it will draw, set a move and this total function will animate
    obstacles.forEach((obstacle) => {
      obstacle.draw(ctx);
      obstacle.update(deltaTime);
    });
    obstacles = obstacles.filter((obstacle) => !obstacle.toDelete);
  }

  // time global up top
  function countdown() {
    if (time > 0) {
      time -= 1;
    }
  }
  setInterval(countdown, 1000);

  // display status text (have a timer possibly or display score)
  function displayStatusText(context) {
    context.fillStyle = "#b73014";
    context.font = "24px scaryFont";
    let displayTime;
    if (time >= 110) {
      displayTime = `1:${time - 60}`;
    } else if (time >= 70) {
      displayTime = `1:${time - 60}`;
    } else if (time > 59) {
      displayTime = `1:0${time - 60}`;
    } else if (time > 9) {
      displayTime = `0:${time}`;
    } else {
      displayTime = `0:0${time}`;
    }
    context.fillText(displayTime, containerWidth * 0.91, 40);
    if (time === 0) {
      gameOver = true;
    }
  }

  function displayEndGameText() {
    if (gameOver && gameLost) {
      ctx.textAlign = "center";
      ctx.fillStyle = "white";
      ctx.fillText("You Lost", containerWidth / 2 - 4, containerHeight / 2 - 3);
      ctx.textAlign = "center";
      ctx.fillStyle = "black";
      ctx.fillText("You Lost", containerWidth / 2 - 3, containerHeight / 2 - 2);
      ctx.textAlign = "center";
      ctx.fillStyle = "#b73014";
      ctx.fillText("You Lost", containerWidth / 2, containerHeight / 2);
    } else if (gameOver) {
      ctx.textAlign = "center";
      ctx.fillStyle = "#b73014";
      ctx.fillText("You Survived", containerWidth / 2, containerHeight / 2);
    }
    // console.log(context);
  }

  function playAgain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let remBorder = document.querySelector(".game-window");
    remBorder.style.borderStyle = "none";
    let titleDiv = document.getElementById("title");
    titleDiv.style.display = "none";
    ctx.font = "42px scaryFont";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Play Again?",
      containerWidth / 2 - 3,
      containerHeight / 2 + 9
    );
    ctx.font = "42px scaryFont";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(
      "Play Again?",
      containerWidth / 2 - 3,
      containerHeight / 2 + 10
    );
    ctx.font = "42px scaryFont";
    ctx.textAlign = "center";
    ctx.fillStyle = "#b73014";
    ctx.fillText("Play Again?", containerWidth / 2, containerHeight / 2 + 11);

    toggleDisplay();
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && gameOver == true) {
      console.log("restart the game");
      gameOver = false;
      gameLost = false;
      location.reload();
    }
  });

  function toggleDisplay() {
    document.getElementById("enterBtn").style.display = "inherit";
  }
  function showControls() {
    document.getElementById("controls").style.display = "inherit";
  }
  function hideControls() {
    document.getElementById("controls").style.display = "none";
  }

  function endGameFunc() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayEndGameText();
  }

  // instantiate the input handler
  const input = new InputHandler();
  const michael = new MichaelMeyers(canvas.width, canvas.height);
  //in this instance of the Player class, we pass in the canvas width and height to establish game boundaries (check this)
  const laurie = new LaurieStrode(canvas.width, canvas.height);
  // instantiate the background object class
  const background = new Background(canvas.width, canvas.height);

  // helper variable to track change in time using time stamps
  let lastTime = 0;
  //base case to reset obs generation
  let obsTimer = 0;
  let obsInterval = 1000;
  let randomSpawnInterval = Math.random() * 1500;
  // main animation loop to update and draw game 60 times per second
  console.log(gameOver);
  function animate(timeStamp) {
    // diff in time stamp from last animation to loop to this animation loop (requestAnimationFrame auto generates time stamp) so animate function is passed time stamp as an argument
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp; // will auto adjust refresh rate
    // deletes entire canvas between each animation so not "painting" over itself
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // we have to have the player draw the context onto the canvas
    background.draw(ctx);
    background.update();
    laurie.draw(ctx);
    laurie.update(input, deltaTime, obstacles);
    michael.draw(ctx);
    michael.update(deltaTime);
    handleObstacles(deltaTime);
    if (timerStart) displayStatusText(ctx);

    // recursion for endless animation loop
    if (gameOver != true) requestAnimationFrame(animate);
    if (gameOver == true) {
      setTimeout(endGameFunc, 2200);
      hideControls();
      gameAudio.pause();
      gameAudio2.play();
      setTimeout(playAgain, 10600);
    }
  }
  //invoke continuous animation loop
  animate(0); // pass zero for timestamp feature
  if (gameOver) console.log(gameOver);
});

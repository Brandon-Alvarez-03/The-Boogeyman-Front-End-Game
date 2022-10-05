//we want javascript to wait until game is fully loaded

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");
  //ctx = contect --> instance of built-in canvas 2d that holds drawing methods and properties needed for animation
  const ctx = canvas.getContext("2d");
  let containerWidth = document.querySelector(".game-window").offsetWidth;
  let containerHeight = document.querySelector(".game-window").offsetHeight;

  console.log(containerWidth, containerHeight);
  canvas.width = containerWidth;
  canvas.height = containerHeight;

  // split game responsibilities into classes

  // input handler class (applies event listeners to keyboard and holds array of all currently active keys)
  class InputHandler {
    constructor() {
      //this.keys will handle control events, keys are added and removed from this array as pressed and released
      this.keys = [];
      //event listener in constructor so when instance of class is created/executed, this allows event listeners to be auto applied
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
        console.log(e.key, this.keys);
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
        console.log(e.key, this.keys);
      });
    }
  }

  // player class (reacts to keys and reacts by draws in and update players)
  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 300;
      this.height = 350;
      //can move player by adjusting x and y coords
      this.x = 0;
      //the game height minus the players height starts it right on the ground
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImg");
    }
    //this canvas method allows us to draw the context that we pass in to the canvas
    draw(context) {
      context.fillStyle = "white";
      context.fillRect(this.x, this.y, this.width, this.height);
      //next step is load in the sprite sheet then figure out how to isolate what you want
      //ALSO MAKE SPRITE SHEET BACKGROUND TRANSPARENT
      context.drawImage(
        this.image,
        sx,
        sy,
        sw,
        sh,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    // this allows us to update the state of movement by placing in an animation loop and requesting animation frames
    update() {
      this.x++;
    }
  }

  //background class  (endliss scrolling background)
  class Background {}

  // enemy generation class

  class Obstacle {}

  // function for adding, animating and removing enemies
  function handleObstacles() {}

  // display status text (have a timer possibly or display score)
  function displayStatusText() {}

  // instantiate the input handler
  const input = new InputHandler();
  //in this instance of the Player class, we pass in the canvas width and height to establish game boundaries (check this)

  const player = new Player(canvas.width, canvas.height);

  // main animation loop to update and draw game 60 times per second
  function animate() {
    // deletes entire canvas between each animation so not "painting" over itself
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // we have to have the player draw the context onto the canvas
    player.draw(ctx);
    player.update();
    // recursion for endless animation loop
    requestAnimationFrame(animate);
  }
  //invoke continuous animation loop
  animate();
});

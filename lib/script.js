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
  class LaurieStrode {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 240;
      //can move player by adjusting x and y coords
      this.x = 0;
      //the game height minus the players height starts it right on the ground
      this.y = this.gameHeight - this.height;
      this.image = document.getElementById("playerImg");
      this.frameX = 0;
      this.frameY = 0;
      this.speed = 0;
      this.vy = 0;
      this.gravity = 0.8;
    }
    //this canvas method allows us to draw the context that we pass in to the canvas
    draw(context) {
      // context.fillStyle = "white";
      // context.fillRect(this.x, this.y, this.width, this.height);
      //next step is load in the sprite sheet then figure out how to isolate what you want
      //ALSO MAKE SPRITE SHEET BACKGROUND TRANSPARENT
      context.drawImage(
        this.image,
        1287 + 120 * this.frameX,
        170,
        120,
        160,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    // this allows us to update the state of movement by placing in an animation loop and requesting animation frames
    update(input) {
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
      if (this.x < 0) {
        this.x = 0; // if player position moves onto neg x-axis set player position back to zero (left game boundary)
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
      this.height = containerHeight;
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y);
    }
  }

  // enemy generation class

  class Obstacle {}

  // function for adding, animating and removing enemies
  function handleObstacles() {}

  // display status text (have a timer possibly or display score)
  function displayStatusText() {}

  // instantiate the input handler
  const input = new InputHandler();
  //in this instance of the Player class, we pass in the canvas width and height to establish game boundaries (check this)
  const laurie = new LaurieStrode(canvas.width, canvas.height);
  // instantiate the background object class
  const background = new Background(canvas.width, canvas.height);

  // main animation loop to update and draw game 60 times per second
  function animate() {
    // deletes entire canvas between each animation so not "painting" over itself
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // we have to have the player draw the context onto the canvas
    background.draw(ctx);
    laurie.draw(ctx);
    laurie.update(input);
    // recursion for endless animation loop
    requestAnimationFrame(animate);
  }
  //invoke continuous animation loop
  animate();
});
